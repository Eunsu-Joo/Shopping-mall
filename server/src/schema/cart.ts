import { gql } from "apollo-server-express";

const cartSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    description: String!
    createdAt: String
  }
  type CartItem {
    id: ID!
    product: Product!
    amount: Int!
  }
  extend type Query {
    cart: [CartItem!]
  }
  extend type Mutation {
    addCart(id: ID!): CartItem!
    updateCart(id: ID!, amount: Int!): CartItem!
    deleteCart(id: ID!): ID!
    executePay(ids: [ID!]): [ID!]
  }
`;
export default cartSchema;
