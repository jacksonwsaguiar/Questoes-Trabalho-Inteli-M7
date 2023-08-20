var express = require("express");

const connection = require("./dbConnection");

const AuthenticationMiddleware = require("./middleware");
const app = express();
const cors = require("cors")
var jwt = require("jsonwebtoken");
var crypt = require("bcryptjs");
var bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email=$1";

  const values = [email];

  const result = await connection.query(query, values);

  try {
    if (result.rows == 0) {
      return res.status(404).send("User not found!");
    }
    const user = result.rows[0];

    const correctPassword = await crypt.compare(password, user.password);

    if (!correctPassword) return res.status(401).send("Password incorrect!");

    const token = jwt.sign(
      { user: JSON.stringify(user) },
      "1010FVSBYSEIUWTOE",
      { expiresIn: "60m" }
    );
    delete user.password;
    return res.status(200).json({ data: { user, token } });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

app.use(AuthenticationMiddleware);

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const query = "INSERT INTO tasks (title) VALUES ($1) RETURNING *";
  const values = [title];

  const result = await connection.query(query, values);
  res.json(result.rows[0]);
});

app.get("/tasks", async (req, res) => {

  const query = "SELECT * FROM tasks";

  const result = await connection.query(query);
  res.json(result.rows);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id = $1";
  const result = await connection.query(query, [id]);
  res.json(result.rowCount > 0);
});

app.patch("/tasks/:id/check", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  const query = "UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING *";
  const values = [id, completed];

  const result = await connection.query(query, values);

  res.json(result.rows[0]);
});

app.listen(3000, '0.0.0.0', () => {
  console.log("api working on port 3000");
});
