const cors = require("cors");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const { request } = require("express");

// Used for sending the Json Data to Node API
app.use(bodyparser.json());
app.use(
  cors({
    origin: "*",
  })
);
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rohit123",
  database: "react_app",
  multipleStatements: true,
});
// To check whether the connection is succeed for Failed while running the project in console.
mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Db Connection Succeed");
  } else {
    console.log(
      "Db connect Failed \n Error :" + JSON.stringify(err, undefined, 2)
    );
  }
});
app.listen(5000, () => {
  console.log("Server is Running on : 5000");
});
let result, object;
app.post("/login", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM login WHERE userName = ? AND password = ?",
    [req.body.username, req.body.password],
    (err, rows, fields) => {
      let request = req.body;
      if (!err) {
        if (rows.length === 1) {
          result = Object.values(JSON.parse(JSON.stringify(rows)));
          object = result[0];
          const acsessToken = jwt.sign(result[0], "mySecretKey");
          res.json(acsessToken);
        } else {
          res.status(400).json("UserName Or Password incorrect!");
        }
        // res.send(rows);
        // console.log(rows.length);
      } else console.log(err);
    }
  );
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token);
    // console.log(object);
    jwt.verify(token, "mySecretKey", (err, object) => {
      if (err) {
        return res.status(403).json("Token is not Vaild");
      }
      req.object = object;
      next();
    });
  } else {
    res.status(401).json("You are not authenticaated!");
  }
};

app.delete("/users/:userId", verify, (req, res) => {
  // console.log(req.object);
  // console.log(req.params);
  // console.log(req.object.isAdmin);
  // console.log(req.object.id);
  // console.log(req.params.userId);
  if (
    req.object.id === Number(req.params.userId) ||
    JSON.parse(req.object.isAdmin)
  ) {
    res.status(200).json("Username has been Deleted");
  } else {
    res.status(403).json("you are not allowed to delete this user!");
  }
});
