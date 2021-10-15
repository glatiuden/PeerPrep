import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "AUTH_SECRET";

export default function generateJWTToken(payload: { user_id: string }) {
  const token = jwt.sign(payload, secret, { expiresIn: "24h" });
  return token;
}
