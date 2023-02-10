import gql from "graphql-tag";

export const ADD_CART = gql`
  mutation ADD_CART($id: String) {
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
export const DELETE_CART = gql`
  mutation DELETE_CART($id: String) {
    id
  }
`;
export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: String, $amount: Int) {
    cart(id: $id, amount: $amount) {
      id
      imageUrl
      price
      title
    }
  }
`;
