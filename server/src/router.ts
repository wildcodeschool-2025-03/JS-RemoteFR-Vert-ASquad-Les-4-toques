import cookieParser from "cookie-parser";
import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Define recipe-related routes
import recipeActions from "./modules/recipe/recipeActions";

router.get("/api/recipes", recipeActions.browse);
router.get("/api/recipes/:id", recipeActions.read);

/* ************************************************************************* */

// Define ingredient-related routes
import ingredientActions from "./modules/ingredient/ingredientActions";

router.get("/api/ingredients", ingredientActions.browse);
router.get("/api/ingredients/:id", ingredientActions.read);

/* ************************************************************************* */

import { hashPassword, login } from "./middlewares/argon.middleware";
import {
  checkEmail,
  checkEmailAndStoreUserData,
} from "./middlewares/checkEmail.middleware";
import userActions from "./modules/user/userActions";
import validateUser from "./validation/userValidation";

router.post("/api/login", checkEmailAndStoreUserData, login);

router.post(
  "/api/register",
  validateUser,
  checkEmail,
  hashPassword,
  userActions.add,
);
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/users/:id", validateUser, hashPassword, userActions.edit);
router.delete("/api/users/:id", userActions.destroy);

/* ************************************************************************* */

/** cokie validation route */
import { verifyCookie } from "./middlewares/verifyCookie.middleware";

const cookieCheck = cookieParser();
router.get("/api/me", cookieCheck, verifyCookie);

export default router;
