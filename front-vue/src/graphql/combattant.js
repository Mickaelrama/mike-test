import { gql } from "graphql-tag";

export const ADD_COMBATTANT = gql`
  mutation ($args: AddCombattantInput!) {
    addCombattant(args: $args) {
      _id
    }
  }
`;

export const GET_COMBATTANTS = gql`
  query {
    getCombattants {
      _id
      nom
      HP
      MP
      ST
    }
  }
`;
