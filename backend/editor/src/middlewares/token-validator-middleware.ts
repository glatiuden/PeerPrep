import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function (req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "test") {
    next();
    return;
  }

  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "AUTH_SECRET");
    if (verified) {
      next();
    }
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
