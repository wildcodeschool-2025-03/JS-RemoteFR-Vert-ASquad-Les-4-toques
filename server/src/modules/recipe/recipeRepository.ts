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
      "SELECT r_id, picture, name, (SELECT JSON_ARRAYAGG(title) FROM step WHERE recipe.r_id = step.recipe_id) AS etapes, (SELECT JSON_ARRAYAGG(nom) FROM recipe_ingredient JOIN db_ciqual ON recipe_ingredient.ingredient_id = db_ciqual.id WHERE recipe_id = recipe.r_id) AS ing FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id GROUP BY r_id",
    );
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT r_id, picture, name, (SELECT JSON_ARRAYAGG(title) FROM step WHERE recipe.r_id = step.recipe_id) AS etapes, (SELECT JSON_ARRAYAGG(nom) FROM recipe_ingredient JOIN db_ciqual ON recipe_ingredient.ingredient_id = db_ciqual.id WHERE recipe_id = recipe.r_id) AS ing FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id GROUP BY r_id HAVING recipe.r_id=? ",
      [id],
    );
    return rows[0] as recipeType;
  }
}

export default new RecipeRepository();
//      "SELECT r_id,name, JSON_ARRAYAGG(title) AS etapes, JSON_ARRAYAGG(nom) AS ingr FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id JOIN recipe_ingredient ON recipe_ingredient.recipe_id = recipe.r_id WHERE recipe_id=recipe.r_id LEFT JOIN step ON recipe.r_id = step.recipe_id GROUP BY r_id HAVING recipe.r_id=?",

//"SELECT r_id, name SELECT JSON_ARRAYAGG(title) AS etapes, JSON_ARRAYAGG(nom) AS ingr FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id JOIN recipe_ingredient ON recipe_ingredient.recipe_id = recipe.r_id JOIN db_ciqual ON recipe_ingredient.ingredient_id = db_ciqual.id LEFT JOIN step ON recipe.r_id = step.recipe_id GROUP BY r_id",

/*
"SELECT r_id, name 
(SELECT JSON_ARRAYAGG(title) FROM step WHERE recipe.r_id = step.recipe_id) AS etapes 
(SELECT JSON_ARRAYAGG(nom) FROM recipe_ingredient JOIN db_ciqual ON recipe_ingredient.ingredient_id = db_ciqual.id) AS ing 
FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id GROUP BY r_id




"SELECT r_id,name, JSON_ARRAYAGG(title) AS etapes, JSON_ARRAYAGG(nom) AS ingr FROM recipe JOIN category ON category.id = recipe.category_id LEFT JOIN recipe_label ON recipe.r_id = recipe_label.recipe_id LEFT JOIN label ON label.id =recipe_label.label_id JOIN recipe_ingredient ON recipe_ingredient.recipe_id = recipe.r_id JOIN db_ciqual ON recipe_ingredient.ingredient_id = db_ciqual.id LEFT JOIN step ON recipe.r_id = step.recipe_id GROUP BY r_id",
 */
