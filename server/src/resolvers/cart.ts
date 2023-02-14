import { Cart, ProductType, ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
import { CartType } from "client/src/type";
import { GraphQLError } from "graphql/error";

const setJSON = (data: Cart) => writeDB(DBFile.CART, data);
const cartResolver: ResolverType = {
  Query: {
    cart: (parent, args, { db }, info) => {
      //얘가 자동으로 parent 가 되는건가..?
      return db.cart;
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }) => {
      if (!id) throw new Error("상품이 없습니다.");
      const targetProduct = db.products.find(
        (data: ProductType) => data.id === id
      );
      if (!targetProduct) throw new Error("상품이 없습니다.");
      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex > -1) {
        const newCartItem = {
          ...db.cart[existCartIndex],
          amount: db.cart[existCartIndex].amount + 1,
        };
        db.cart.splice(existCartIndex, 1, newCartItem);
        setJSON(db.cart);
        return newCartItem;
      }
      const newItem = {
        id,
        amount: 1,
        product: targetProduct,
      };
      db.cart.push(newItem);
      setJSON(db.cart);
      return newItem;
    },
    updateCart: (parent, { id, amount }, { db }) => {
      const target = db.cart.find((cart) => cart.id === id);
      if (!id || !target) throw new Error("상품이 없습니다.");
      const newCartItem = { ...target, amount };
      const existCartIndex = db.cart.indexOf(target);
      if (newCartItem.amount > 100)
        throw new GraphQLError("100자 이하로 담아주세요.", {
          extensions: { code: "BAD_REQUEST" },
        });
      db.cart.splice(existCartIndex, 1, newCartItem);
      setJSON(db.cart);
      return newCartItem;
    },
    deleteCart: (parent, { id }, { db }) => {
      const existCartIndex = db.cart.findIndex((cart) => cart.id === id);
      if (existCartIndex < 0) throw new Error("없는 데이터 입니다.");
      db.cart.splice(existCartIndex, 1);
      setJSON(db.cart);
      return id;
    },
    executePay: (parent, { ids }, { db }) => {
      const newCartData = db.cart.filter((cart: CartType) => {
        return !ids.includes(cart.id);
      });
      db.cart = newCartData;
      setJSON(db.cart);
      return ids;
    },
  },
  CartItem: {
    //     type CartItem {
    //   id: ID!
    //   product: Product!
    //   amount: Int!
    // }
    //요거때문에 접근이 가능한거임
    //CartItem 을 호출하고, product에 접근했을 때 return으로 받을 함수 resolver
    product: (cartItem, args, { db }) => {
      return db.products.find((product) => product.id === cartItem.id);
    },
  },
};
export default cartResolver;
