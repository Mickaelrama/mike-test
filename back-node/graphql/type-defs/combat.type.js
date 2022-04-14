import { gql } from "apollo-server";

export default gql`
  type Combattant {
    _id: ID
    nom: String
    HP: Float
    MP: Float
    ST: Float
  }

  enum ActionEnum {
    FRAPPER
    LANCER_SORT
  }
  enum Player {
    playerOne
    playerTwo
  }

  type Combat {
    _id: ID
    playerOne: Combattant
    playerTwo: Combattant
    playerOneHealth: Float
    playerTwoHealth: Float
    match: String
    winner: Combattant
  }

  input AddCombatInput {
    combattant: ID!
    match: ID!
  }

  input ActionInput {
    _id: ID!
    action: ActionEnum!
    combattant: ID!
    match: ID!
    domicile: ID!
    exterieur: ID!
    attackedPlayer: Player!
  }

  input JoinCombatInput {
    _id: ID!
    combattant: ID!
    match: ID!
  }

  type Mutation {
    addCombat(args: AddCombatInput!): ID
    actionCombat(args: ActionInput!): ID
    joinCombat(args: JoinCombatInput!): ID
  }
`;
