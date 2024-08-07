import pg from 'pg';
import { config } from 'dotenv';

config();

const { Client } = pg;

 
const pool = new Client({
  host: process.env.POSTGRES_HOST,
  user:  process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  connectionTimeoutMillis: 2000,
})

export default pool