export default {
  Photo: {
    post: ({ id }, _, { prisma }) =>
      prisma.photo.findUnique({ where: { id } }).post(),
  },
};
