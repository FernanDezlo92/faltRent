import pool from "../../bbdd";
import  UsersPreferencesRepository from "../repository";
import  UsersPreferences  from "../entity";


class UsersPreferencesPgRepository implements UsersPreferencesRepository {

    async getAll(): Promise<UsersPreferences[]> {
      const usersPreferences = await pool.query("SELECT * FROM users_preferences");
      return usersPreferences.rows;
    }

    async getByUserId(userId: number) {
        const query = `
            SELECT role, location, search_range
            FROM users_preferences
            WHERE user_id = $1
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows[0] || null;
    }

    async create(userPreference: UsersPreferences): Promise<UsersPreferences> {
        const user = await pool.query(
            "INSERT INTO users_preferences (user_id) VALUES ($1) RETURNING *",
            [userPreference.user_id]
        );
        return user.rows[0];
    }

    async update(userPreference: UsersPreferences): Promise<UsersPreferences> {
        const user = await pool.query(
            "UPDATE users_preferences SET user_id = $1 WHERE id = $2 RETURNING *",
            [userPreference.user_id, userPreference.id]
        );
        return user.rows[0];
    }

    async delete(userId: number): Promise<boolean> {
        const preferences = await pool.query("DELETE FROM users_preferences WHERE id = $1", [userId]);
        return preferences.rowCount === 1;
    }
}

export default UsersPreferencesPgRepository;