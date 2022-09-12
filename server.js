const express = require("express");
const expressGraphQl = require("express-graphql").graphqlHTTP;
const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = require("graphql");

// importing user.json file to use the data
const UserData = require("./user.json");

const app = express();

//Defining a User type

const UserType = new GraphQLObjectType({
    name: "User",
    fields:() =>({
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuerytype",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {name: {type: GraphQLString}},
            resolve(parent, args){
                return UserData
            }
        }
    }
});

const schema = new GraphQLSchema({query: RootQuery});

app.use("/", expressGraphQl({
    schema,
    graphiql: true
}))

// Listening to port 3000

app.listen(3000, function(){
    console.log("Server is running");
});