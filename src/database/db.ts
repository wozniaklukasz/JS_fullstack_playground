import {Pool} from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  //@ts-ignore
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE
});

export default pool;
