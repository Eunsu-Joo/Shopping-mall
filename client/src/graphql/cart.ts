import gql from "graphql-tag";

export const ADD_CART = gql`
  mutation ADD_CART($id: ID!) {
    addCart(id: $id) {
      id
      amount
    }
  }
`;

export const GET_CART = gql`
  query GET_CART {
    cart {
      product {
        imageUrl
        price
        title
        id
      }
      amount
      id
    }
  }
`;
export const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart(id: $id)
  }
`;
export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(id: $id, amount: $amount) {
      id
      amount
      product {
        imageUrl
        price
        title
        id
      }
    }
  }
`;
