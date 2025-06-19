import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type recipeType = {
  id: number;
  name: string;
  cost: number;
  difficulty: number;
  nb_people: number;
  qte_ingredients: number;
  picture: string;
  additional_text: string;
  is_validated: boolean;
  category_id: number;
  user_id: number;
  step_number: number;
  title: string;
  description: string;
  image: string;
  recipe_id: number;
  label_id: number;
  label: string;
};

class RecipeRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM recipe JOIN category ON category.id = recipe.category_id JOIN step ON recipe.id = step.recipe_id JOIN recipe_label ON recipe.id = recipe_label.recipe_id JOIN label ON label.id =recipe_label.label_id",
    );
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM recipe WHERE id=? JOIN category ON category.id = recipe.category_id JOIN step ON recipe.id = step.recipe_id JOIN recipe_label ON recipe.id = recipe_label.recipe_id JOIN label ON label.id =recipe_label.label_id",
      [id],
    );
    return rows[0] as recipeType;
  }
}

export default new RecipeRepository();
