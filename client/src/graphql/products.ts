import gql from "graphql-tag";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($cursor: ID) {
    products(cursor: $cursor) {
      id
      imageUrl
      price
      title
      description
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
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation ADD_PRODUCT(
    $imageUrl: String!
    $price: Int!
    $title: String!
    $description: String!
  ) {
    addProduct(
      imageUrl: $imageUrl
      title: $title
      price: $price
      description: $description
    )
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $imageUrl: String!
    $price: Int!
    $title: String!
    $description: String!
    $id: ID!
  ) {
    updateProduct(
      imageUrl: $imageUrl
      title: $title
      price: $price
      description: $description
      id: $id
    )
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export default GET_PRODUCTS;
