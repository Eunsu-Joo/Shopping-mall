import gql from "graphql-tag";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    id
    imageUrl
    price
    title
    description
    createdAt
  }
`;
export const GET_PRODUCT = gql`
  query GET_PRODUCT {
    id
    imageUrl
    price
    title
    description
    createdAt
  }
`;
export default GET_PRODUCTS;
