import { Client } from "pg";

const schemaName = 'public';

export async function createTableProperties (client : Client) {
    try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.properties (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        type VARCHAR(255),
        status VARCHAR(255),
        price NUMERIC(10, 2),
        location VARCHAR(255),
        preferences JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'users' created successfully.");
  } catch (err) {
    console.error("Error creating 'users' table:", err);
  }
}