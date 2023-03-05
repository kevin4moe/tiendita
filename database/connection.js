import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
  host: 'localhost',
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
await client.connect();

const res = await client.query('SELECT * FROM products');
console.log(res.rows); // Hello world!
await client.end();
