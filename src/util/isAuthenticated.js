import jwt from "jsonwebtoken";
export const isAuthenticated = async (token, prisma) => {
  if (!token) {
    throw Error("You need to log in first to perform this action!");
  } else {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
};
