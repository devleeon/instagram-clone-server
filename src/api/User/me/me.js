export default {
  Query: {
    me: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      return user;
    },
  },
};
