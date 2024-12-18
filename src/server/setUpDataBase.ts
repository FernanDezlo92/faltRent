import pool from "./bbdd";
import { createTableUsers } from "./users/seeds";


export async function setUpDatabase() {

    await pool.connect();

  try {
    await createTableUsers(pool);
    console.log("Database set up successfully.");
} catch (err) {
  console.error("Error setting up database:", err);
}
}