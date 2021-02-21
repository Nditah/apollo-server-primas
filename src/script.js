const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
    const newArtist = await prisma.artist.create({
        data: {
            name: "Michael Jackson",
            gender: "M",
            contact: "MJ Studio, LA",
        }
    });

    const newAlbum = await prisma.album.create({
        data: {
            title: 'Lost Children',
            genre: 'Slow',
            artist: { connect: { id: 1 } },
        }
    });
    const allArtist = await prisma.artist.findMany();
    const allAlbums = await prisma.album.findMany();
    console.log({ allArtist, allAlbums });
}

main()
    .catch(e => { throw e })
    .finally(async () => { await prisma.$disconnect() })