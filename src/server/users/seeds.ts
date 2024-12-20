import { Client } from "pg";

const schemaName = 'public';

export async function createTableProperties(client: Client) {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.properties (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER NOT NULL REFERENCES ${schemaName}.users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2),
        location VARCHAR(255),
        photos JSONB,
        status VARCHAR(255) DEFAULT 'available',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'properties' created successfully.");
  } catch (err) {
    console.error("Error creating 'properties' table:", err);
  }
}
