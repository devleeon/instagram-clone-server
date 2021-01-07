import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.PASSPORT_SECRET);
};
export default generateToken;
