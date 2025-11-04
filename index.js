const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");
// middleware to parse JSON request bodies
app.use(bodyParser.json());

// endpoint to handle GET requests to the root URL
app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    // hasil data dari mysql
    response(200, results, "List of users", res);
  });
});

app.get("/hello", (req, res) => {
  console.log({ urlParam: req.query });
  res.send("Hello, World!");
});
app.post("/login", (req, res) => {
  console.log({ reqFromOutside: req.body });
  res.send("Login successful!");
});

app.put("/username", (req, res) => {
  console.log({ updateData: req.body });
  const username = req.body.username;
  if (username === usernameFromDbExists) {
    return res.status(400).send("Username is already taken.");
  }
  res.send("Username updated successfully!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
