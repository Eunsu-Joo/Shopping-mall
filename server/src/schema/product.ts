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
    products(cursor: ID): [Product!]
    product(id: ID!): Product
  }
  extend type Mutation {
    addProduct(
      title: String!
      imageUrl: String!
      price: Int!
      description: String!
    ): Int!
  }
`;
export default productsSchema;
