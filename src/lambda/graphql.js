const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  
  type Item {
    id: ID!
    text: String!
  }

  type Query {
    hello: String
    items: [Item]
  }
  
  type Mutation {
    removeItem(id: ID): ID
    addItem(text: String): Item
  }

`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return "Hello, world!";
    },
    items: (_, __) => {
      // return db.select('*').from('items')
      return [
        {id: "1", text: "Item"},
        {id: "2", text: "Item"},
      ]
    }
  },
  Mutation: {
    removeItem: async (_, { id }) => {
      // const removed_rows = await db('items').where({ id }).del()
      // return id
      return "1"
    },
    addItem: async (_, { text }) => {
      // const idList = await db('items').insert({text: 'Item'}).returning('id')
      // return { id: idList[0], text }
      return { id: "3", text: "Item" }
    }
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false
  }
});
