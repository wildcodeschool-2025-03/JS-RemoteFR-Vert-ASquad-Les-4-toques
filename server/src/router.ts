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

export default router;
