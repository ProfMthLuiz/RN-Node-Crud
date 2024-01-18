const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors"); // Adicione esta linha

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Adicione esta linha

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_example",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// Rotas CRUD
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(query, [name, email, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});
