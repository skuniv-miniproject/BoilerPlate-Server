import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  buildSchema
} from "graphql";

const Schema = new buildSchema(`
    type Query 
  
  `);

module.exports = Schema;
