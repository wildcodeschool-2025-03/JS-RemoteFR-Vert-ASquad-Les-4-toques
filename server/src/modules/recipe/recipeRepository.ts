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
      "SELECT r_id,picture, name, (SELECT JSON_ARRAYAGG(title) FROM step WHERE recipe.r_id = step.recipe_id) AS etapes, (SELECT JSON_ARRAYAGG(nom) FROM recipe_ingredient JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id WHERE recipe_id = recipe.r_id) AS ing FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id GROUP BY r_id",
    );
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT r_id, picture, name, (SELECT JSON_ARRAYAGG(title) FROM step WHERE recipe.r_id = step.recipe_id) AS etapes, (SELECT JSON_ARRAYAGG(nom) FROM recipe_ingredient JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id WHERE recipe_id = recipe.r_id) AS ing FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id GROUP BY r_id HAVING recipe.r_id=? ",
      [id],
    );
    return rows[0] as recipeType;
  }
}

export default new RecipeRepository();
