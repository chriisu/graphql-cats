const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs, resolvers } = require('./schema')

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send(
    `Hello! </br></br> GraphQL Playground available at <a href=${server.graphqlPath}>${server.graphqlPath}</a>`
  )
})

app.listen({ port: 1234 }, () =>
  console.log(`🚀Server ready at http://localhost:1234${server.graphqlPath}`)
)
