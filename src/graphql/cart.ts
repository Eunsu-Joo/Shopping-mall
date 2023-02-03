import gql from "graphql-tag";

export const ADD_CART = gql`
  mutation ADD_CART($id: number) {
    id
    imageUrl
    price
    title
  }
`;

export const GET_CART = gql`
  query GET_CART {
    id
    imageUrl
    price
    title
  }
`;
export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: number, $amount: number) {
    cart(id: $id, amount: $amount) {
      id
      imageUrl
      price
      title
    }
  }
`;
