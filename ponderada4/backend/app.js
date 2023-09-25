var express = require("express");

const connection = require("./dbConnection");

const AuthenticationMiddleware = require("./middleware");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
var crypt = require("bcryptjs");
var bodyParser = require("body-parser");
const { getDataFromCsv } = require("./treatCsv");

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

////quantidade de dados, media de idade,media de ganhos, media de score

app.get("/dashboard", async (req, res) => {
  getDataFromCsv()
    .then((data) => {
      console.log("Data from CSV loaded...return to client");
      var count = data.length;
      var age = 0;
      var annual = 0;
      var score = 0;

      var men = 0;
      var women = 0;

      data.forEach((element) => {
        age += parseInt(element["Age"]);
        annual += parseInt(element["Annual Income (k$)"]);
        score += parseInt(element["Spending Score (1-100)"]);

        if (element["Gender"] == "Male") men += 1;
        else women += 1;
      });

      var sortedData = data.sort((a, b) => parseInt(a.Age) - parseInt(b.Age));

      var stepSize = Math.ceil(count / 12);

      var selectedItems = [];
      for (let i = 0; i < 12; i++) {
        var index = i * stepSize;
        if (index < count) {
          selectedItems.push(data[index]);
        }
      }

      age = age / count;
      annual = annual / count;
      score = score / count;
      genders = {
        men: men,
        women: women,
      };
      submit = {
        raw: sortedData,
        annualM: annual,
        scoreM: score,
        gendersNum: genders,
        ageM: age,
        count: count,
        itemsDistribuition: selectedItems,
      };

      res.json(submit);
    })
    .catch((error) => {
      console.error("Error reading CSV:", error);
    });
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

app.listen(3000, "0.0.0.0", () => {
  console.log("api working on port 3000");
});
