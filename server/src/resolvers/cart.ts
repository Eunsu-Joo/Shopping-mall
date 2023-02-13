import { ResolverType } from "./types";

const fakeData = Array.from({ length: 20 }).map((_, i) => ({
  id: (i + 1).toString(),
  url: `https://picsum.photos/200/300?random=${i + 1}`,
  price: Math.floor(Math.random() * 300),
  title: "제목입니다.",
  description: "설명입니다.",
  createdAt: new Date().toString(),
}));
let cartData = [
  { id: "1", amount: 1 },
  { id: "2", amount: 2 },
];
const cartResolver: ResolverType = {
  Query: {
    cart: (parent, args, context, info) => {
      return cartData;
    },
  },
  Mutation: {
    addCart: (parent, { id }, context, info) => {
      let newData = { ...cartData };
      const found = fakeData.find((data) => data.id === id);
      if (!found) throw new Error("상품이 없습니다.");
      const newItem = { ...found, amount: (newData[id]?.amount || 0) + 1 };
      newData[id] = newItem;
      cartData = newData;
      return newItem;
    },
    updateCart: (parent, { id, amount }, context, info) => {
      let newData = { ...cartData };
      if (!newData[id]) {
        throw Error("없는 데이터 입니다.");
      }
      const newItem = { ...newData[id], amount };
      newData[id] = newItem;
      cartData = newData;
      return newItem;
    },
    deleteCart: (parent, { id }, context, info) => {
      const newData = { ...cartData };
      if (!newData[id]) {
        throw Error("삭제할 데이터가 없습니다.");
      }
      delete newData[id];
      cartData = newData;
      return id;
    },
    executePay: (parent, { ids }, context, info) => {
      const newCartData = cartData.filter(
        (cartItem) => !ids.includes(cartItem.id)
      );
      cartData = newCartData;
      return ids;
    },
  },
};
export default cartResolver;
