async function createArtist(parent, args, context, info) {
    const { name, gender, contact } = args;
    const newArtist = await context.prisma.artist.create({
        data: { name, gender, contact },
    });
    context.pubsub.publish(`ARTIST_${newArtist.id}`, newArtist);
    return newArtist;
}

async function updateArtist(parent, args, context, info) {
    const { id, name, contact } = args;
    const newArtist = await context.prisma.artist.update({
        where: { id: Number(id) },
        data: { name, contact },
    });
    context.pubsub.publish(`ARTIST_${newArtist.id}`, newArtist);
    return newArtist;
}

async function createAlbum(parent, args, context, info) {
    const { title, genre, artist: artistId } = args;
    const newAlbum = await context.prisma.album.create({
        data: {
            title,
            genre,
            artist: { connect: { id: artistId } },
        },
    });
    return newAlbum
}

async function updateAlbum(parent, args, context, info) {
    const { id, genre, title } = args;
    const newAlbum = await context.prisma.album.update({
        where: { id: Number(id) },
        data: { genre, title },
    });
    return newAlbum;
}

module.exports = {
    createArtist,
    updateArtist,
    createAlbum,
    updateAlbum,
}