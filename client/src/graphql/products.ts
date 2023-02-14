import gql from "graphql-tag";

const GET_PRODUCTS = gql`
query GET_Product {
  products {
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
export default GET_PRODUCTS;
