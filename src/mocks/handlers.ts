import { v4 as uuid } from "uuid";
export interface GraphQLRequest {
  query: string;
  variables: Record<string, any>;
  //{[key:string]:number}
}

import { graphql } from "msw";
const fakeData = Array.from({ length: 20 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://placeimg.com/300/150/tech/${i + 1}`,
  price: Math.floor(Math.random() * 300),
  title: "제목입니다.",
  description: "설명입니다.",
  createdAt: new Date().toString(),
}));
export const handlers = [
  graphql.query("GET_PRODUCTS", (req, res, ctx) => {
    console.log(req, res);
    return res(
      ctx.data({
        products: fakeData,
      })
    );
  }),
  // graphql.mutation("Login", null),
];
