import prisma from "../../util/prisma";

export default {
  Photo: {
    post: ({ id }) => prisma.photo.findUnique({ where: { id } }).post(),
  },
};
