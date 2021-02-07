import jwt from "jsonwebtoken";
export default {
  Query: {
    me: async (_, __, { isAuthenticated, token, prisma }) => {
      const user = await isAuthenticated(token, prisma);
      return user;
    },
  },
};
