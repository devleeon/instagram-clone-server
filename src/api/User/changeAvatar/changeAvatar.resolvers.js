import cloudinary from "cloudinary";
import prisma from "../../../util/prisma";
export default {
  Mutation: {
    changeAvatar: async (_, args, { isAuthenticated, token }) => {
      const userId = await isAuthenticated(token);
      const { avatar } = args;
      const { createReadStream } = await avatar;
      let url;
      let err;
      const uploadStream = async (readStream) => {
        try {
          await new Promise((resolve, reject) => {
            const streamLoad = cloudinary.v2.uploader.upload_stream(
              {
                folder: `user/${userId}`,
                public_id: `avatar`,
                transformation: [
                  {
                    width: 320,
                    height: 320,
                    gravity: "face",
                    radius: "max",
                    crop: "fill",
                  },
                ],
              },
              async (err, image) => {
                if (err) {
                  reject(err);
                } else {
                  await prisma.user.update({
                    where: { id: userId },
                    data: {
                      avatar: image.secure_url,
                    },
                  });
                  url = image.secure_url;
                  resolve(image);
                }
              }
            );
            readStream.pipe(streamLoad);
          });
        } catch (error) {
          err = error;
        }
      };
      const readStream = createReadStream();
      try {
        await uploadStream(readStream);
        return { url };
      } catch {
        return { error: err };
      }
    },
  },
};
