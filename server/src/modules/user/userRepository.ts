import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";
import type { UserType } from "../../lib/definitions";

class userRepository {
  async create(user: UserType) {
    const { firstname, lastname, pseudo, email, password, age, role_id } = user;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, pseudo, email, password, age, role_id ) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.pseudo,
        user.email,
        user.password,
        user.age,
        user.role_id,
      ],
    );

    return result.insertId;
  }
}

export default new userRepository();
