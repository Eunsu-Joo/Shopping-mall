import { v4 as uuid } from "uuid";
export interface GraphQLRequest {
  query: string;
  variables: Record<string, any>;
  //{[key:string]:number}
}

import { graphql } from "msw";
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
    const newData = { ...cartData };
    const id = req.variables.id;
    if (newData[id]) {
      newData[id] = {
        ...newData[id],
        amount: (newData[id].amount || 0) + 1,
      };
    } else {
      const product = fakeData.find((data) => data.id === +req.variables.id);
      newData[id] = { ...product, amount: 1 };
    }
    cartData = newData;
    return res(ctx.data(newData));
  }),
  graphql.query("GET_CART", (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation("UPDATE_CART", (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newData[id]) {
      throw Error("업는 데이터 입니다.");
    }
    newData[id] = {
      ...newData[id],
      amount,
    };
    cartData = newData;
    return res(ctx.data(newData));
  }),
];
