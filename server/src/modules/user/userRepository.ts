import type { FieldPacket, ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { UserType } from "../../lib/definitions";
import type { Result, Rows } from "../../../database/client";


class userRepository {
  async create(user: UserType) {
    const { firstname, lastname, pseudo, email, password, age, role_id } = user;

    const [result]: [ResultSetHeader, FieldPacket[]] =
      await databaseClient.query<Result>(
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

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as UserType;
  }

  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT firstname FROM user WHERE email=?",
      [email],
    );
    return rows[0] as UserType | undefined;
  }
}

export default new userRepository();
