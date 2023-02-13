import { DBFile, readDB } from "./dbController";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";

const express = require("express");

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db: {
        products: readDB(DBFile.PRODUCTS),
        cart: readDB(DBFile.CART),
      },
    },
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
  await app.listen({ port: 8000 });
  console.log(readDB(DBFile.PRODUCTS));
  console.log("server listening on 8000.,..");
})();
