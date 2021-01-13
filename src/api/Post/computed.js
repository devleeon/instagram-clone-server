import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  Post: {
    isLiked: async (root, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: postId } = root;
      const result = await prisma.post.findFirst({
        where: {
          AND: [{ id: postId }, { likes: { some: { userId: user.id } } }],
        },
      });

      return Boolean(result);
    },
    numberOfLikes: async (root, _, {}) => {
      const { id } = root;
      return prisma.like.count({ where: { postId: id } });
    },
  },
};
