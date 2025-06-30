import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import userRepository from "../user/userRepository";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readByEmailWithPassword(req.body.email);

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(user.password, req.body.password);

    if (verified) {
      const { password, ...userWithoutHashedPassword } = user;

      const myPayload: JwtPayload = {
        firstname: user.firstname,
        lastname: user.lastname,
      };

      const token = await jwt.sign(
        myPayload,
        process.env.APP_SECRET as string,
        {
          expiresIn: "1h",
        },
      );

      res.json({ token, user: userWithoutHashedPassword });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};
