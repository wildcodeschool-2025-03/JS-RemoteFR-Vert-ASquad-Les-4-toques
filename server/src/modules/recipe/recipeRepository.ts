import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type recipeType = {
  id: number;
  name: string;
  cost: number;
  difficulty: number;
  nb_people: number;
  qte_ingredients: number;
  picture: string;
  additional_text: string;
};

class RecipeRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, qte_ingredients, picture, additional_text FROM recipe",
    );
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, qte_ingredients, picture, additional_text FROM recipe WHERE recipe.id=? ",
      [id],
    );
    return rows[0] as recipeType;
  }

  async readByRecentlyAdded() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, qte_ingredients, picture, additional_text FROM recipe ORDER BY id DESC LIMIT 5",
    );
    return rows as recipeType[];
  }
}

export default new RecipeRepository();
