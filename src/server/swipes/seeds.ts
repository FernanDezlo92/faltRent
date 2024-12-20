import { Client } from "pg";

const schemaName = 'public';

export async function createTableSwipes(client: Client) {
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.swipes (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES ${schemaName}.users(id) ON DELETE CASCADE,
          property_id INTEGER NOT NULL REFERENCES ${schemaName}.properties(id) ON DELETE CASCADE,
          direction VARCHAR(50) NOT NULL CHECK (direction IN ('like', 'dislike')),
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Table 'swipes' created successfully.");
    } catch (err) {
      console.error("Error creating 'swipes' table:", err);
    }
  }
  