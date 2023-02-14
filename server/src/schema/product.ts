import { gql } from "apollo-server-express";

const productsSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    description: String!
  }
  extend type Query {
    products: [Product!]
    product(id: ID!): Product
  }
`;
export default productsSchema;
