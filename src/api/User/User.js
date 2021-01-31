export default {
  User: {
    fullname: (root) => {
      return `${root.firstname} ${root.lastname}`;
    },
    amIFollowing: async (root, _, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: rootId } = root;
      const result = await prisma.user.findFirst({
        where: {
          AND: [{ id: rootId }, { followedBy: { some: { id: user.id } } }],
        },
      });
      return Boolean(result);
    },
    followedBy: async ({ id }, _, { prisma }) =>
      await prisma.user.findUnique({ where: { id } }).followedBy(),
    following: async ({ id }, _, { prisma }) =>
      await prisma.user.findUnique({ where: { id } }).following(),
    numberOfFollowers: async ({ id }, _, { prisma }) => {
      const count = await prisma.user
        .findUnique({ where: { id } })
        .followedBy();
      return count.length;
    },
    numberOfFollowings: async ({ id }, _, { prisma }) => {
      const count = await prisma.user.findUnique({ where: { id } }).following();
      return count.length;
    },
    posts: async ({ id }, _, { prisma }) =>
      await prisma.user.findUnique({ where: { id } }).posts(),
    numberOfPosts: async ({ id }, _, { prisma }) => {
      const count = await prisma.user.findUnique({ where: { id } }).posts();
      return count.length;
    },
    isSelf: (root, _, { request }) => {
      const { user } = request;
      const { id: rootId } = root;
      return user.id === rootId;
    },
  },
};
