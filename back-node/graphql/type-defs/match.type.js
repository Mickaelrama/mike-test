import { gql } from "apollo-server";

export default gql`
  type User {
    _id: ID
    email: String
    username: String
    password: String
    role: Role
  }

  type Match {
    _id: ID
    domicile: User
    exterieur: User
    done: Boolean
  }

  input JoinMatchInput {
    _id: ID!
    exterieur: String!
  }

  type Mutation {
    addMatch(domicile: String!): Match
    joinMatch(args: JoinMatchInput!): String!
  }

  type Query {
    getDispoMatches: [Match]
  }
`;
