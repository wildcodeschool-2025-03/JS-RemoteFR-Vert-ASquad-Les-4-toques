import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type recipeType = {
  id: number;
  name: string;
  calories: string;
  proteines: string;
  glucides: string;
  lipides: string;
  sucre: string;
  sel: string;
};

class IngredientRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM db_ciqual");
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM db_ciqual WHERE id=?",
      [id],
    );
    return rows[0] as recipeType;
  }
}

export default new IngredientRepository();
