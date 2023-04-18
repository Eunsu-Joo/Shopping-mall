import gql from "graphql-tag";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($cursor: String, $showDeleted: Boolean, $filter: String) {
    products(cursor: $cursor, showDeleted: $showDeleted, filter: $filter) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;
export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation ADD_PRODUCT(
    $title: String!
    $imageUrl: String!
    $price: Int!
    $description: String!
  ) {
    addProduct(
      title: $title
      imageUrl: $imageUrl
      price: $price
      description: $description
    ) {
      createdAt
      description
      id
      imageUrl
      price
      title
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $title: String
    $imageUrl: String
    $price: Int
    $description: String
  ) {
    updateProduct(
      id: $id
      title: $title
      imageUrl: $imageUrl
      price: $price
      description: $description
    ) {
      createdAt
      id
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id)
  }
`;
export const DELETE_HIDE_PRODUCT = gql`
  mutation DELETE_HIDE_PRODUCT($id: ID!) {
    deleteHideProduct(id: $id)
  }
`;
export default GET_PRODUCTS;
