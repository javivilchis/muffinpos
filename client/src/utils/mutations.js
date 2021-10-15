import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($employeeID: String!, $password: String!) {
    login(employeeID: $employeeID, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $employeeID: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      employeeID: $employeeID
    ) {
      token
      user {
        _id
      }
    }
  }
`;
