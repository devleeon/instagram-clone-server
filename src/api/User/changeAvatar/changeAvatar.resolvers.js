import { createWriteStream } from "fs";
export default {
  Mutation: {
    changeAvatar: async (_, args, { isAuthenticated, token }) => {
      const userId = await isAuthenticated(token);
      const { avatar } = args;

      return avatar.then((file) => {
        const readStream = file.createReadStream();
        // maybe aws?
        return file;
      });
    },
  },
};
