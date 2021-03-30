import prisma from "../../../util/prisma";
import cloudinary from "cloudinary";

export default {
  Mutation: {
    createPost: async (_, args, { token, isAuthenticated }) => {
      const id = await isAuthenticated(token);
      const { location, caption, photos } = args;
      const post = await prisma.post.create({
        data: {
          location,
          caption,
          user: { connect: { id } },
        },
      });
      const uploadStream = async (readStream, index) => {
        try {
          await new Promise((resolve, reject) => {
            const streamLoad = cloudinary.v2.uploader.upload_stream(
              {
                folder: `post/${post.id}`,
                public_id: `${index}`,
                transformation: [
                  {
                    width: 700,
                    height: 700,
                    crop: "fill",
                  },
                ],
              },
              async (err, image) => {
                if (err) {
                  reject(err);
                } else {
                  await prisma.photo.create({
                    data: {
                      url: image.secure_url,
                      post: { connect: { id: post.id } },
                    },
                  });
                  resolve(image);
                }
              }
            );
            readStream.pipe(streamLoad);
          });
        } catch (error) {
          console.log(error);
        }
      };

      try {
        await Promise.all(
          photos.map(async (photo, index) => {
            const { createReadStream } = await photo;
            const readStream = createReadStream();
            await uploadStream(readStream, index);
          })
        );

        return post;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },
};
