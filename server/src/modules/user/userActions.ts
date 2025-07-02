import type { RequestHandler } from "express";
import type { UserType } from "../../lib/definitions";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res) => {
  const users = await userRepository.readAll();

  const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);

  res.json(usersWithoutPasswords);
};

const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const user = await userRepository.read(parsedId);

  if (user != null) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.sendStatus(404);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updatedUser: UserType = {
      id: Number(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      role_id: req.body.role_id,
    };

    const affectedRows = await userRepository.update(updatedUser);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
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
export default { browse, read, edit, add };
