import { ApolloServer } from "@apollo/server";
import schema from "./graphql/schema.js";
import { ContextValue, resolvers } from "./graphql/resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import PostgresDB from "./db/index.cjs";
import { ApolloServerPluginUsageReporting } from "@apollo/server/plugin/usageReporting";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  status400ForVariableCoercionErrors: true,
  plugins: [
    ApolloServerPluginUsageReporting({
      // If you pass unmodified: true to the usage reporting
      // plugin, Apollo Studio receives ALL error details
      sendErrors: { unmodified: true },
    }),
  ],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.PORT) || 5000 },
  context: async ({ req, res }) => {
    const db = await PostgresDB.connection(); // TODO this is typed wrong at the moment. not awaiting correctly in the class
    if(!db){
      throw new GraphQLError('Database has not been initialized', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 400 },
        }
      });
    }

    const user = await PostgresDB.getUser(req); // can be undefined
  
    const context: ContextValue = {
      db, 
      user
    }

    return context;
  },
});

console.log(`🚀  Server ready at: ${url}`);
