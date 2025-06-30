import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

export const hashPassword: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hash = await argon2.hash(password, hashingOptions);

    req.body.password = hash;

    next();
  } catch (err) {
    next(err);
  }
};

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("authorization");

    if (!authorizationHeader) {
      res.status(401).json({ error: "Authorization header is missing" });
      return;
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer" || !token) {
      res.status(401).json({ error: "Invalid authorization format" });
      return;
    }

    req.auth = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as JwtPayload;

    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.sendStatus(401);
  }
};

export default { verifyToken };
