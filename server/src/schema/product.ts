import { gql } from "apollo-server-express";

const productsSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    description: String!
    createdAt: Float! #graphql에서 Int 자리수 제한있음.
  }
  extend type Query {
    products: [Product!]
    product(id: ID!): Product
  }
`;
export default productsSchema;
