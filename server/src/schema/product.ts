import { gql } from "apollo-server-express";

const productsSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    description: String!
    createdAt: String
  }
  extend type Query {
    products(cursor: String, showDeleted: Boolean, filter: String): [Product!]
    product(id: ID!): Product
  }
  extend type Mutation {
    addProduct(
      title: String!
      imageUrl: String!
      price: Int!
      description: String!
    ): Product!
    updateProduct(
      id: ID!
      title: String
      imageUrl: String
      price: Int
      description: String
    ): Product!
    deleteProduct(id: ID!): ID!
    deleteHideProduct(id: ID!): ID!
  }
`;
export default productsSchema;
