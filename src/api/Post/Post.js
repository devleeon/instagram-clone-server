import prisma from "../../util/prisma";

export default {
  Post: {
    photos: ({ id }) => prisma.post.findUnique({ where: { id } }).photos(),
    comments: ({ id }) =>
      prisma.post.findUnique({ where: { id } }).comments({ take: 2 }),
    user: ({ id }) => prisma.post.findUnique({ where: { id } }).user(),
    likes: ({ id }) =>
      prisma.post.findUnique({ where: { id } }).likes({ take: 10 }),
    isLiked: async (root, _, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { id: postId } = root;
      const result = await prisma.like.findFirst({
        where: { AND: [{ postId }, { userId: id }] },
      });
      return Boolean(result);
    },
    isSaved: async (root, _, { token, isAuthenticated }) => {
      const userId = await isAuthenticated(token);
      const { id: postId } = root;
      const result = await prisma.save.findFirst({
        where: { AND: [{ postId }, { userId }] },
      });
      console.log(result);
      return Boolean(result);
    },
    numberOfLikes: async (root) => {
      const { id } = root;
      return prisma.like.count({ where: { postId: id } });
    },
    numberOfComments: async (root) => {
      const { id } = root;
      return prisma.comment.count({ where: { postId: id } });
    },
  },
};
