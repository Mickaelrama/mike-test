import { gql } from "graphql-tag";

export const LOGIN = gql`
  mutation ($args: UserLoginInput!) {
    login(args: $args) {
      _id
      username
      email
      token
      role
    }
  }
`;

export const ADD_NEW_USER = gql`
  mutation ($args: UserCreateInput!) {
    register(args: $args) {
      _id
      username
      email
      token
      role
    }
  }
`;
