import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT) || 5000 },
});
console.log(`🚀  Server ready at: ${url}`);
//# sourceMappingURL=index.js.map