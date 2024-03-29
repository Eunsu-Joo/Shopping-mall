import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import "dotenv/config";

const express = require("express");
// const formatError = (err: GraphQLError) => {
//   console.error("--- GraphQL Error ---");
//   console.error("Path:", err.path);
//   console.error("Message:", err.message);
//   console.error("Code:", err.extensions.code);
//   console.error("Original Error", err.originalError);
//   return err;
// };
(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // context: {
    //   db: {
    //     products: readDB(DBFile.PRODUCTS).reverse(),
    //     cart: readDB(DBFile.CART),
    //   },
    // },
    // debug: false,
    // formatError,
  });

  const app = express();
  await server.start();
  //server 에게 express로 구동이 된다 라고  알려주는 거임.
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });
  const port = process.env.PORT || 8000;
  await app.listen({ port });
  console.log("server listening on 8000.,..", `port is ${port}`);
})();
