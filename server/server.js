const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs, resolvers } = require('./schema')

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()

server.applyMiddleware({ app })

app.use(express.static(`${__dirname}/../dist`))

app.listen({ port: 1234 }, () =>
  console.log(`🚀Server ready at http://localhost:1234${server.graphqlPath}`)
)
