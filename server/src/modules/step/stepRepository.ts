import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type stepType = {
  id: number;
  step_number: number;
  title: string;
  description: string;
  image: string;
};

class StepRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, step_number, title, description, image FROM step",
    );
    return rows as stepType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, step_number, title, description, image FROM step WHERE id=? ",
      [id],
    );
    return rows[0] as stepType;
  }

  async readByRecipe(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT step.id, step_number, title, description, image FROM step JOIN recipe ON step.recipe_id = recipe.id WHERE recipe.id=?",
      [id],
    );
    return rows as stepType[];
  }
}

export default new StepRepository();
