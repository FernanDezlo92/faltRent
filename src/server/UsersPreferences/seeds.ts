import { Client } from "pg";

const schemaName = 'public';


export async function createTableUsersPreferences(client: Client) {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.users_preferences (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        role VARCHAR(50) CHECK (role IN ('propietario', 'buscador')) NOT NULL,
        location VARCHAR(255),
        search_range INT DEFAULT 10,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'users_preferences' created successfully.");
  } catch (err) {
    console.error("Error creating 'users_preferences' table:", err);
  }
}