import { v4 as uuid } from "uuid";
export interface GraphQLRequest {
  query: string;
  variables: Record<string, any>;
  //{[key:string]:number}
}

import { graphql } from "msw";
import { CartType } from "../type";
const fakeData = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  url: `https://placeimg.com/300/150/tech/${i + 1}`,
  price: Math.floor(Math.random() * 300),
  title: "제목입니다.",
  description: "설명입니다.",
  createdAt: new Date().toString(),
}));
let cartData: any = {};
export const handlers = [
  graphql.query("GET_PRODUCTS", (req, res, ctx) => {
    return res(ctx.data(fakeData));
  }),
  graphql.query("GET_PRODUCT", (req, res, ctx) => {
    const product = fakeData.find((data) => data.id === +req.variables.id);
    return res(
      ctx.data({
        product,
      })
    );
  }),

  graphql.mutation("ADD_CART", (req, res, ctx) => {
    let newData = { ...cartData };
    const id = req.variables.id;
    const found = fakeData.find((data) => data.id === +req.variables.id);
    if (!found) throw new Error("상품이 없습니다.");
    const newItem = { ...found, amount: (newData[id]?.amount || 0) + 1 };
    newData[id] = newItem;
    cartData = newData;
    return res(ctx.data(newItem));
  }),
  graphql.query("GET_CART", (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation("UPDATE_CART", (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newData[id]) {
      throw Error("없는 데이터 입니다.");
    }
    const newItem = { ...newData[id], amount };
    newData[id] = newItem;
    cartData = newData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation("DELETE_CART", ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };
    if (!newData[id]) {
      throw Error("삭제할 데이터가 없습니다.");
    }
    delete newData[id];
    cartData = newData;
    return res(ctx.data(id));
  }),
];
