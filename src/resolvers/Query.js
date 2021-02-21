const info = () => `:: This is my Musique API for Artists' Ablbums ::`;

async function album(parent, args, context, info) {
    const where = args.filter
        ? {
            OR: [
                { title: { contains: args.filter } },
                { genre: { contains: args.filter } },
            ],
        }
        : {}
    const result = await context.prisma.album.findMany({ where });
    return result
}

async function artist(parent, args, context, info) {
    const where = args.filter
        ? {
            OR: [
                { name: { contains: args.filter } },
                { contact: { contains: args.filter } },
            ],
        }
        : {}
    const result = await context.prisma.artist.findMany({ where });
    return result
}

module.exports = {
    info,
    artist,
    album,
}