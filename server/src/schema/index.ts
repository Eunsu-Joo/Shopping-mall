import { gql } from "apollo-server-express";
import productsSchema from "./product";
import cartSchema from "./cart";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
export default [linkSchema, cartSchema, productsSchema];
