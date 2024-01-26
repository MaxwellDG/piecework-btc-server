import { dateScalar } from "./customScalars.js";

const users = [
  {
    id: 1,
    role: "SUPERADMIN",
  },
];

export type ContextValue = {
  db: any,
  user?: any
}

// NOTE contextValue is very useful. It can get authentication data, db connections, header data etc...

// NOTE an explicitly stated resolver is not usually required for queries' properties
// GraphQL is still using a resolver to do it, but it's created by default
// i.e. a user.name resolver is actually getting called in the resolver-chain, but it's default behaviour

export const resolvers = {
  Date: dateScalar,
  Query: {
    user(_, { id }, context: ContextValue, _) {
      // TODO change this to a db query
      return users.find((user) => user.id === id);
    },
  },
};
