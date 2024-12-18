import { Client } from "pg";

const schemaName = 'public';

export async function createTableUsers(client: Client) {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(255),
        photo VARCHAR(255),
        admin BOOLEAN DEFAULT FALSE,
        type VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table 'users' created successfully.");
  } catch (err) {
    console.error("Error creating 'users' table:", err);
  }
}