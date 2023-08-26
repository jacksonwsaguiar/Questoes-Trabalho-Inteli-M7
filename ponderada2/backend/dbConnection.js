const { Pool } = require("pg");
var crypt = require("bcryptjs");

const connection = new Pool({
  user: "postgres",
  host: "database-container",
  database: "postgres",
  password: "1234",
  port: 5432, // PostgreSQL default port
});

async function createTableIfNotExists() {
  const queryTasks = `
      CREATE TABLE IF NOT EXISTS tasks (
        id serial PRIMARY KEY,
        title VARCHAR(100),
        completed BOOLEAN DEFAULT false
      );
    `;
  const queryUsers = `
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      );
    `;
  const insertUser = `INSERT INTO users (email, password) VALUES ($1,$2) ON CONFLICT (email) DO NOTHING;`;

  try {
    await connection.query(queryTasks);
    console.log('Table "tasks" created or already exists.');
    await connection.query(queryUsers);
    console.log('Table "users" created or already exists.');

    var pass = await crypt.hashSync("1234", 8);
    const values = ["chukwueze@gmail.com", pass];

    await connection.query(insertUser, values).catch((e)=> console.log(e));
    console.log("default user created");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTableIfNotExists();

module.exports = connection;
