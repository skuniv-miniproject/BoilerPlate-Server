"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _graphql = require("graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: "test",
    fields: {
      hello: {
        type: _graphql.GraphQLString,
        resolve: function resolve() {
          return "world";
        }
      }
    }
  })
});
var app = (0, _express["default"])();
app.use("/graphql", (0, _expressGraphql["default"])({
  schema: schema,
  graphiql: true
}));
app.listen(4000, function () {
  return console.log("Server Start on port 4000 http://localhost/graphql");
});