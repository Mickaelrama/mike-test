import { gql } from "apollo-server";

export default gql`
  type Combattant {
    _id: ID
    nom: String
    HP: Float
    MP: Float
    ST: Float
  }

  input AddCombattantInput {
    nom: String!
    HP: Float
    MP: Float
    ST: Float
  }

  type Mutation {
    addCombattant(args: AddCombattantInput!): Combattant
  }

  type Query {
    getCombattants: [Combattant]
  }
`;
