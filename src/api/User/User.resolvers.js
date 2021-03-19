import prisma from "../../util/prisma";
export default {
  User: {
    fullname: (root) => {
      return `${root.firstname} ${root.lastname}`;
    },
    amIFollowing: async (root, _, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { id: rootId } = root;
      const result = await prisma.user.findFirst({
        where: {
          AND: [{ id: rootId }, { followedBy: { some: { id } } }],
        },
      });
      return Boolean(result);
    },
    followedBy: async ({ id }) =>
      await prisma.user
        .findUnique({ where: { id } })
        .followedBy({ select: { id: true, username: true, avatar: true } }),
    following: async ({ id }) =>
      await prisma.user
        .findUnique({ where: { id } })
        .following({ select: { id: true, username: true, avatar: true } }),
    numberOfFollowers: async ({ id }) => {
      const count = await prisma.user
        .findUnique({ where: { id } })
        .followedBy({ select: { id: true } });
      return count.length;
    },
    numberOfFollowings: async ({ id }) => {
      const count = await prisma.user
        .findUnique({ where: { id } })
        .following({ select: { id: true } });
      return count.length;
    },
    posts: async ({ id }) =>
      await prisma.user.findUnique({ where: { id } }).posts(),
    numberOfPosts: async ({ id }) => {
      const count = await prisma.user
        .findUnique({ where: { id } })
        .posts({ select: { id: true } });
      return count.length;
    },
    isSelf: async (root, _, { isAuthenticated, token }) => {
      const id = await isAuthenticated(token);
      const { id: rootId } = root;
      return id === rootId;
    },
    saved: async ({ id }) =>
      await prisma.user.findUnique({ where: { id } }).saved(),
    tagged: async ({ id }) =>
      await prisma.user.findUnique({ where: { id } }).tagged(),
    chatRooms: async ({ id }) =>
      await prisma.user.findUnique({ where: { id } }).chatRooms(),
  },
};
