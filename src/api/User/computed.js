import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  User: {
    fullname: (root) => {
      return `${root.firstname} ${root.lastname}`;
    },
    amIFollowing: async (root, _, { request, isAuthenticated }) => {
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
    isSelf: (root, _, { request }) => {
      const { user } = request;
      const { id: rootId } = root;
      return user.id === rootId;
    },
  },
};
