
function albums(parent, args, context) {
    return context.prisma.artist.findUnique({ where: { id: parent.id } }).albums()
}

module.exports = {
    albums,
}
