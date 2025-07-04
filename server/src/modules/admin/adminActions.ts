import type { RequestHandler } from "express";
import userRepository from "../user/userRepository";
import recipeRepository from "../recipe/recipeRepository";
import ingredientRepository from "../ingredient/ingredientRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const dashboardRecettes = await recipeRepository.readAll();
    const dashboardIngredients = await ingredientRepository.readAll();
    const dashboardUtilisateurs = await userRepository.readAll();
    res.json({
      dashboardUtilisateurs,
      dashboardRecettes,
      dashboardIngredients,
    });
  } catch (err) {
    next(err);
  }
};

export default { browse };
