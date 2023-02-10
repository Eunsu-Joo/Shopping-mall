import express from "express";
import { ApolloServer } from "apollo-server-express";

// const server = new ApolloServer({
//   typeDefs: schema,
//   resolvers,
// });

(async () => {
  const server = new ApolloServer({});

  const app = express();
  await server.start();
  //server 에게 express로 구동이 된다 라고  알려주는 거임.
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });
  await app.listen({ port: 8000 });
  console.log("server listening on 8000.,..");
})();
