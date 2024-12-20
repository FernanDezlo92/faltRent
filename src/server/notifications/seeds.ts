import { Client } from "pg";

const schemaName = 'public';

export async function createTableNotifications(client: Client) {
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.notifications (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES ${schemaName}.users(id) ON DELETE CASCADE,
          type VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Table 'notifications' created successfully.");
    } catch (err) {
      console.error("Error creating 'notifications' table:", err);
    }
  }
  