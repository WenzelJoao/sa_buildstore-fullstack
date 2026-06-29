import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const conexao = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "5432",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "senai",
  database: process.env.DB_NAME || "construcao"
});

export default conexao;
