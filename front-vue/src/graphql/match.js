import { gql } from "graphql-tag";

export const GET_DISPO_MATCHES = gql`
  query {
    getDispoMatches {
      _id
      domicile {
        _id
        email
        username
      }
      exterieur {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_MATCH = gql`
  mutation ($domicile: String!) {
    addMatch(domicile: $domicile) {
      _id
    }
  }
`;

export const JOIN_MATCH = gql`
  mutation ($args: JoinMatchInput!) {
    joinMatch(args: $args)
  }
`;
