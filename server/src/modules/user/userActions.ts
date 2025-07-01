import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const edit: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      role_id: req.body.role_id,
    };

    const affectedRows = await userRepository.update(newUser);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      role_id: req.body.role_id,
    };

    const insertId: number = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
export default {edit, add };
