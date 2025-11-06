const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");
// middleware to parse JSON request bodies
app.use(bodyParser.json());

// endpoint to handle GET requests to the root URL
app.get("/users/:id", (req, res) => {
  const sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    response(200, results, "User found", res);
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    response(200, results, "List of users", res);
  });
});

app.get("/search", (req, res) => {
  const name = req.query.name;
  console.log(`Searching for users with name: ${name}`);

  const sql = `SELECT * FROM users WHERE name LIKE '%${name}%'`;
  db.query(sql, (err, results) => {
    response(200, results, "Search results", res);
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Fetching user with ID: ${id}`);

  const sql = `SELECT * FROM users WHERE id= ${req.query.id}`;
  db.query(sql, (err, results) => {
    response(200, results, "User found", res);
  });
});

app.post("/login", (req, res) => {
  console.log({ reqFromOutside: req.body });
  response(200, req.body, "Login successful", res);
});

app.post("/register", (req, res) => {
  console.log({ registerData: req.body });
  response(201, req.body, "User registered successfully", res);
});

// put itu untuk update data
app.put("/user", (req, res) => {
  console.log({ updateData: req.body });
  response(200, req.body, "User updated successfully", res);
});

// delete itu untuk menghapus data
app.delete("/user", (req, res) => {
  console.log({ deleteData: req.body });
  response(200, req.body, "User deleted successfully", res);
});

app.post("/add-course", (req, res) => {
  console.log({ courseData: req.body });
  response(201, req.body, "Course added successfully", res);
});

app.post("/update-course", (req, res) => {
  console.log({ updateCourseData: req.body });
  response(200, req.body, "Course updated successfully", res);
});

// start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
