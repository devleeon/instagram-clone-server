import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 365 * 10,
  });
};
export default generateToken;
