import { Cart, ProductType, ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

const setJSON = (data: Cart) => writeDB(DBFile.CART, data);
const cartResolver: ResolverType = {
  Query: {
    cart: async (parent, args) => {
      const cart = collection(db, "cart");
      const cartSnap = await getDocs(cart);
      //얘가 자동으로 parent 가 되는건가..?
      const data: DocumentData[] = [];

      cartSnap.forEach((doc) => {
        // ID가 없기떄문에 강제로 ID 넣어줌.
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    },
  },
  Mutation: {
    addCart: async (parent, { id }) => {
      // if (!id) throw new Error("상품이 없습니다.");
      // const targetProduct = db.products.find(
      //   (data: ProductType) => data.id === id
      // );
      // if (!targetProduct) throw new Error("상품이 없습니다.");
      // const existCartIndex = db.cart.findIndex((item) => item.id === id);
      // if (existCartIndex > -1) {
      //   const newCartItem = {
      //     ...db.cart[existCartIndex],
      //     amount: db.cart[existCartIndex].amount + 1,
      //   };
      //   db.cart.splice(existCartIndex, 1, newCartItem);
      //   setJSON(db.cart);
      //   return newCartItem;
      // }
      // const newItem = {
      //   id,
      //   amount: 1,
      //   product: targetProduct,
      // };
      // db.cart.push(newItem);
      // setJSON(db.cart);
      // return newItem;
      if (!id) throw Error("상품이 없습니다.");
      const productRef = doc(db, "products", id); //products중 해당 ID를 갖고 있는 아이템
      const cartCollection = collection(db, "cart");
      console.log(id);
      const exist = (
        await getDocs(query(cartCollection, where("product", "==", productRef)))
      ).docs[0]; //docs 불러옴
      let cartRef: any = 0;
      if (exist) {
        //  있다면
        cartRef = doc(db, "cart", exist.id);
        await updateDoc(cartRef, {
          amount: increment(1),
        });
      } else {
        //  없다면
        cartRef = await addDoc(cartCollection, {
          amount: 1,
          product: productRef,
        });
      }
      const [cart, product] = await Promise.all([
        getDoc(cartRef),
        getDoc(productRef),
      ]);
      const test: any = cart.data();
      return {
        product: product.data(),
        id: cart.id,
        amount: test.amount,
      };
    },
    updateCart: async (parent, { id, amount }) => {
      // const target = db.cart.find((cart) => cart.id === id);
      // if (!id || !target) throw new Error("상품이 없습니다.");
      // const newCartItem = { ...target, amount };
      // const existCartIndex = db.cart.indexOf(target);
      // if (newCartItem.amount > 100)
      //   throw new GraphQLError("100자 이하로 담아주세요.", {
      //     extensions: { code: "BAD_REQUEST" },
      //   });
      // db.cart.splice(existCartIndex, 1, newCartItem);
      // setJSON(db.cart);
      // return newCartItem;
      if (!id) throw Error("상품이 없습니다.");
      const productRef = doc(db, "products", id); //products중 해당 ID를 갖고 있는 아이템
      const cartCollection = collection(db, "cart");

      const exist = (
        await getDocs(query(cartCollection, where("product", "==", productRef)))
      ).docs[0]; //해당 cartCollection 에서 product가 같은 API 찾아오기.
      if (!exist) throw new Error("상품이 없습니다.");
      const cartRef = doc(db, "cart", exist.id);
      //   //  있다면
      await updateDoc(cartRef, {
        amount,
      });

      const cart = await getDoc(cartRef);

      return {
        ...cart.data(),
        id: cart.id,
        product: productRef,
      };
    },
    deleteCart: async (parent, { id }) => {
      const cartRef = doc(db, "cart", id);
      if (!cartRef) throw new Error("아이템을 찾을 수 없습니다.");
      await deleteDoc(cartRef);
      return id;
    },
    executePay: async (parent, { ids }) => {
      const deleted = [];
      for await (const id of ids) {
        const cartRef = doc(db, "cart", id);
        const cartSnapshot = await getDoc(cartRef);
        const cartData = cartSnapshot.data();
        if (!cartData) throw new Error("데이터가 없습니다.");
        const productRef = cartData?.product;
        if (!productRef) throw new Error("해당 데이터가 없습니다.");
        const product = (await getDoc(productRef)).data() as ProductType;
        if (product.createdAt) {
          await deleteDoc(cartRef);
          deleted.push(id);
        } else {
        }
      }
      return deleted;
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
    product: async (cartItem, args) => {
      //getDoc 데이터로 만들어주는 함수
      const snapshot = await getDoc(cartItem.product);
      const data = snapshot.data() as any;
      return {
        ...data,
        id: snapshot.id,
      };
    },
  },
};
export default cartResolver;
