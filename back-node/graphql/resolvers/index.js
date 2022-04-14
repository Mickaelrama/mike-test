import _ from "lodash";

// all resolvers import
import authResolver from "./auth.resolver";
import matchResolver from "./match.resolver";
import combattantResolver from "./combattant.resolver";
import combatResolver from "./combat.resolver";

export default _.merge(
  authResolver,
  matchResolver,
  combattantResolver,
  combatResolver
);
