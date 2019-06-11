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

import RandomDice from "./model";

// import { getDiffieHellman } from "crypto";

// let schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "test",
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return "world";
//         }
//       }
//     }
//   })
// });

const a = {
  a: "123",
  dafd: 233,
  asdf: 1
};

/* buildSchema 는 간단히 말해서 스키마 명세서 정의 즉 기존 rest API의 api 명세서와 같다고 보면된다.
type Qeury 는 기존 api의 endpoint를 명세하는 부분이라고 생각하면 편할듯 싶다.
Qeury 내부를 살펴보면 콜론 앞이 endpoint name 명시
콜론 뒤쪽 부분은 return Type 을 명시하고 있다.
Class 를 통해서 스키마의 행동을 정의한 경우 (약간 c 언어의 구조체와 비슷한 느낌을 준다.) 
type 에 class명을 적고 class내부에 선언한 method의 함수명과 리턴타입을 명시한다.
마지막엔 type Qeury 내부에서 Endpoint name 명시 및 리턴타입 자리에는 위에 선언한 type을 선언한다.
*/
const testSchema = buildSchema(`
type RandomDice {
  rollOnce : Int!
  roll(numRolls : Int!) : [Int]
}

type Query{
  quoteOfDay : String
  random : Float!
  rollThreeNumber : [Int]
  rollDice(numDice : Int! , numSide : Int ) : [Int]
  getDie(numSides : Int) : RandomDice 
}
`);

const quoteOfDay = () => new Date().getDate();

const root = {
  quoteOfDay: () => quoteOfDay(),
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
  },

  getDie: ({ numSides }) => {
    return new RandomDice(numSides || 6);
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
