import { Client } from "pg";

const schemaName = 'public';

export async function createTableLikes(client: Client) {
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.likes (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES ${schemaName}.users(id) ON DELETE CASCADE,
          property_id INTEGER NOT NULL REFERENCES ${schemaName}.properties(id) ON DELETE CASCADE,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Table 'likes' created successfully.");
    } catch (err) {
      console.error("Error creating 'likes' table:", err);
    }
  }
  