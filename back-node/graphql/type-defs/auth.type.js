import { gql } from "apollo-server";

export default gql`
  enum Role {
    ADMIN
    USER
  }

  type User {
    _id: ID
    email: String
    username: String
    password: String
    role: Role
  }

  type RegisterOutput {
    _id: ID
    email: String
    username: String
    role: Role
    token: String
  }

  input UserCreateInput {
    email: String!
    username: String!
    password: String!
    role: Role!
  }

  input UserLoginInput {
    usernameOrEmail: String!
    password: String!
  }

  type Mutation {
    register(args: UserCreateInput!): RegisterOutput
    login(args: UserLoginInput!): RegisterOutput
  }

  type Query {
    _empty: String
  }
`;
