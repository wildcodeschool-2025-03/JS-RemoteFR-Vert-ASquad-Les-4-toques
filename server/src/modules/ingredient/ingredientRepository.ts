import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type recipeType = {
  id: number;
  nom: string;
  calories: string;
  proteines: string;
  glucides: string;
  lipides: string;
  sucre: string;
  sel: string;
};

class IngredientRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM ingredient");
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM ingredient WHERE id=?",
      [id],
    );
    return rows[0] as recipeType;
  }
}

export default new IngredientRepository();
