import { isAuthenticated } from "../../../util/isAuthenticated";
export default {
  Mutation: {
    addComment: async (_, args, { request, prisma }) => {
      isAuthenticated(request);
      // needed to add timestamp
      const { postId, text } = args;
      const { user } = request;
      const post = prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        // the post doesn't exist
        return false;
      } else {
        await prisma.comment.create({
          data: {
            text,
            post: { connect: { id: postId } },
            user: { connect: { id: user.id } },
          },
        });
        return true;
      }
    },
  },
};
