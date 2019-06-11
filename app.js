import express from "express";
import cors from "cors";
import graphqlHttp from "express-graphql";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  buildSchema
} from "graphql";

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

const a = {
  a: "123",
  dafd: 233,
  asdf: 1
};

const testSchema = buildSchema(`
type Query{
  quoteOfDay : String
  random : Float!
  rollThreeNumber : [Int]
  rollDice(numDice : Int! , numSide : Int ) : [Int]
}
`);

const root = {
  quoteOfDay: () => {
    return Math.random() < 0.5 ? "take is" : "Slave of day";
  },
  random: () => {
    return Math.random();
  },
  rollThreeNumber: () => {
    return [1, 2, 3].map(number => number + 2);
  },
  rollDice: ({ numDice, numSide }) => {
    let output = [];
    console.log(numDice);
    for (let i = 0; i < numDice; i++) {
      output.push(1 * Math.floor(Math.random() * (numSide || 6)));
    }
    return output;
  }
};

const fun = () => {
  const i = 1;
  return i;
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHttp({
    schema: testSchema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log("Server Start on port 4000 http://localhost:4000/graphql")
);
