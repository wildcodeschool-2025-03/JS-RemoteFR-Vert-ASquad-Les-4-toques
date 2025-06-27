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

// Define user-related routes
import userActions from "./modules/user/userActions";

router.post("/api/register", userActions.add);

/* ************************************************************************* */

export default router;
