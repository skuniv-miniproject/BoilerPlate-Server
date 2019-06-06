import express from "express";
import graphqlHttp from "express-graphql";
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "test",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        }
      }
    }
  })
});

const app = express();

app.use(
  "/graphql",
  graphqlHttp({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("Server Start on port 4000 http://localhost/graphql"));
