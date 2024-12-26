import { Client } from "pg";

const schemaName = 'public';

export async function createTableMatches(client: Client) {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.matches (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES ${schemaName}.users(id) ON DELETE CASCADE,
        owner_id INTEGER NOT NULL REFERENCES ${schemaName}.users(id) ON DELETE CASCADE,
        property_id INTEGER NOT NULL REFERENCES ${schemaName}.properties(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'matches' created successfully.");
  } catch (err) {
    console.error("Error creating 'matches' table:", err);
  }
}
