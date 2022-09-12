const express = require("express");
const expressGraphQl = require("express-graphql").graphqlHTTP;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Hello',
        fields: () => ({
            message: {
                type: GraphQLString,
                //write spelling correctly
               resolve: () => "Hello"
            }
        })
    })
});

app.get("/", expressGraphQl({
    schema: schema,
    graphiql: true
}));


app.listen(3000, function(){
    console.log("Server is running");
});