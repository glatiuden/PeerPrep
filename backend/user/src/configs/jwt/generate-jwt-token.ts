import jwt from "jsonwebtoken";
import { UserRole } from "../../models/interfaces/user";

const secret = process.env.JWT_SECRET || "AUTH_SECRET";
const admin_secret = process.env.JWT_ADMIN_SECRET || "ADMIN_AUTH_SECRET";

export default function generateJWTToken(
  payload: { user_id: string; user_role: UserRole },
  options: { expiresIn: string },
) {
  let secret_to_use = secret;
  if (payload.user_role === UserRole.ADMIN) {
    secret_to_use = admin_secret;
  }
  const token = jwt.sign(payload, secret_to_use, options);
  return token;
}
