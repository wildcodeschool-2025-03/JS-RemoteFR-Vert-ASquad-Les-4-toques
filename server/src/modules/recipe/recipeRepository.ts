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
  val_nut: [
    {
      calories: number;
      proteines: number;
      glucides: number;
      lipides: number;
      fibres: number;
    },
  ];
  is_validated: boolean;
  category_id: number;
  user_id: number;
};

class RecipeRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM recipe");
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM recipe WHERE id=?",
      [id],
    );
    return rows[0] as recipeType;
  }
}

export default new RecipeRepository();
