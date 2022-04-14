import { gql } from "graphql-tag";

export const ADD_COMBAT = gql`
  mutation ($args: AddCombatInput!) {
    addCombat(args: $args)
  }
`;

export const JOINED_COMBAT = gql`
  mutation ($args: JoinCombatInput!) {
    joinCombat(args: $args)
  }
`;

export const ATTACK = gql`
  mutation ($args: ActionInput!) {
    actionCombat(args: $args)
  }
`;
