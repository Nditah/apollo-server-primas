
function artist(parent, args, context) {
    return context.prisma.album.findUnique({ where: { id: parent.id } }).artist()
}

module.exports = {
    artist,
}