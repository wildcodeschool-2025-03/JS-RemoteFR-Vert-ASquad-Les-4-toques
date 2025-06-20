import type { RequestHandler } from "express";
import IngredientRepository from "./ingredientRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const ingredients = await IngredientRepository.readAll();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const ingredientId = Number(req.params.id);
    const ingredient = await IngredientRepository.read(ingredientId);

    if (ingredient == null) {
      res.sendStatus(404);
    } else {
      res.json(ingredient);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
