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

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
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
export default GET_PRODUCTS;
