const { withFilter } = require('apollo-server');

function newArtistSubscribe(parent, args, context, info) {
    console.log({ parent, args });
    return context.pubsub.asyncIterator(`NEW_ARTIST`);
}

const newArtist = {
    subscribe: newArtistSubscribe,
    resolve: payload => {
        return payload
    },
};

const modifiedArtist = {
    subscribe: withFilter(
        (parent, args, context, info) => {
            return context.pubsub.asyncIterator(`ARTIST_${args.id}`)
        },
        (payload, variables) => {
            return (payload.id === Number(variables.id));
        },
    ),
    resolve: payload => {
        return payload
    },
};

module.exports = {
    newArtist,
    modifiedArtist,
}