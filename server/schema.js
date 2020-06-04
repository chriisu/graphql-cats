const { gql } = require('apollo-server-express')
const db = require('./db')

const typeDefs = gql`
  type Cat {
    name: String!
    age: Int
    servants: [Human]!
    id: ID!
  }
  type Human {
    name: String
    cats: [Cat]!
    id: ID!
  }

  type Query {
    cat(id: ID!): Cat
    cats: [Cat]
    humans: [Human]
    human(id: ID!): Human
  }
  type Mutation {
    addHuman(name: String!): Human
    addCat(name: String!, age: Int): Cat!
    makeServant(human: ID!, cat: ID!): String
  }
`

const resolvers = {
  Query: {
    cats: (parent, args, context) => db.cats,
    cat: (parent, args, context) =>
      db.cats.find(({ id }) => Number(args.id) === id),
    humans: () => db.humans,
    human: (parent, args, context) =>
      db.humans.find(({ id }) => Number(args.id) === id),
  },
  Mutation: {
    addHuman: (parent, args, context) => db.createHuman(args.name),
    addCat: (parent, args, context) => db.createCat(args.name, args.age),
    makeServant: (parent, args) => db.connectServantToCat(args.human, args.cat),
  },
  Cat: {
    servants: (parent, args, context) =>
      db.humans.filter(({ id }) => parent.servants.includes(id)),
  }
}

module.exports = { typeDefs, resolvers }
