import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || "dev_secret";
  return jwt.sign(payload, secret);
};

export default generateToken;
