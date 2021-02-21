const { ApolloServer, PubSub } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Album = require('./resolvers/Album');
const Artist = require('./resolvers/Artist');

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Artist,
    Album,
}

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
        pubsub,
    },
    subscriptions: {
        path: '/subscriptions'
      },
})

server
    .listen()
    .then(({ url }) =>
        console.log(`🚀 Server is running on ${url}`)
    );