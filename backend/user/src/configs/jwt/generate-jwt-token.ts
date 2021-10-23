import jwt from "jsonwebtoken";
import { UserRole } from "../../models/interfaces/user";

const secret = process.env.JWT_SECRET || "AUTH_SECRET";

export default function generateJWTToken(
  payload: { user_id: string; user_role: UserRole },
  options: { expiresIn: string },
) {
  const token = jwt.sign(payload, secret, options);
  return token;
}
