import User from "../entity";
import pool from "../../bbdd";
import UserRepository from "../repository";

class UsersPgRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const users = await pool.query("SELECT * FROM users");
    return users.rows;
  }

  async getById(id: number): Promise<User> {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return user.rows[0];
  }

  async create(user: User): Promise<User> {
    const { name, email, password, status } = user;
    const existingUser = await this.findUserByName(name);

    if (existingUser) {
      throw new Error("User with this name already exists");
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, status]
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return user.rows[0];
  }

  async findUserByName(name: string): Promise<User | null> {
    const user = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
    return user.rows[0];
  }

  async update(user: User): Promise<User> {
    const { id, name, email, password, status } = user;
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3, status = $4 WHERE id = $5 RETURNING *",
      [name, email, password, status, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<boolean> {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return true;
  }

}

export default UsersPgRepository;