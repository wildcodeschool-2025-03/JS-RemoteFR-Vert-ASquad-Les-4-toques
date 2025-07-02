import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type labelType = {
  id: number;
  label: string;
  image: string;
};

class LabelRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, label, image FROM label",
    );
    return rows as labelType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, label, image FROM label WHERE id=?",
      [id],
    );
    return rows[0] as labelType;
  }
}

export default new LabelRepository();
