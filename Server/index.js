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

//Login API======================================================================================================
let result, object;
app.post("/project/login", (req, res) => {
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
      } else console.log(err);
    }
  );
});
//Customer  API=================================================================

//Get all Customer
app.get("/customer", (req, res) => {
  mysqlConnection.query("select * from customer", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get the Customer Data based on Id
app.get("/customer/:customer_id", (req, res) => {
  mysqlConnection.query(
    "select * from customer where customer_id=?",
    [req.params.customer_id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
app.get("/customer/detail/:customer_id", (req, res) => {
  mysqlConnection.query(
    "select customer_name,customer_mobile_number,customer_email from customer where customer_id = ?",
    [req.params.customer_id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.post("/customer", (req, res) => {
  mysqlConnection.query(
    "insert into customer values(?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.customer_id,
      req.body.name,
      req.body.pan_number,
      req.body.city,
      req.body.state,
      req.body.address,
      req.body.pincode,
      req.body.birthdate,
      req.body.mobile_number,
      req.body.email,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Insertion Completed");
      else console.log(err);
    }
  );
});

app.put("/customer", (req, res) => {
  mysqlConnection.query(
    "update customer set customer_name=?, customer_pan_number=?, customer_city=? ,customer_state =? ,customer_address =? ,customer_pincode =?,customer_birthdate =? ,customer_mobile_number =? ,customer_email = ? where customer_id =? ",
    [
      req.body.name,
      req.body.pan_number,
      req.body.city,
      req.body.state,
      req.body.address,
      req.body.pincode,
      req.body.birthdate,
      req.body.mobile_number,
      req.body.email,
      req.body.customer_id,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Updation Completed");
      else console.log(err);
    }
  );
});

app.delete("/customer/:customer_id", (req, res) => {
  mysqlConnection.query(
    "delete from customer where customer_id=?",
    [req.params.customer_id],
    (err, rows, fields) => {
      if (!err) res.send("Deletation Completed");
      else console.log(err);
    }
  );
});

//Policy API===============================================================================

app.get("/policy", (req, res) => {
  mysqlConnection.query("select * from policy", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});
app.get("/policy/:policy_id", (req, res) => {
  mysqlConnection.query(
    "select * from policy where policy_id=?",
    [req.params.policy_id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
app.post("/policy", (req, res) => {
  mysqlConnection.query(
    "insert into policy (policy_name)values(?)",
    [req.body.policy_name],
    (err, rows, fields) => {
      if (!err) res.send("Insertion Completed");
      else console.log(err);
    }
  );
});

app.put("/policy", (req, res) => {
  mysqlConnection.query(
    "update policy set policy_name=? where policy_id=?",
    [req.body.policy_name, req.body.policy_id],
    (err, rows, fields) => {
      if (!err) res.send("Updation Completed");
      else console.log(err);
    }
  );
});

app.delete("/policy/:policy_id", (req, res) => {
  mysqlConnection.query(
    "delete from policy where policy_id=?",
    [req.params.policy_id],
    (err, rows, fields) => {
      if (!err) res.send("Deletation Completed");
      else console.log(err);
    }
  );
});

//================================================================================================
//Customer-Policy API===============================================================================

app.get("/customer_policy", (req, res) => {
  mysqlConnection.query(
    "select * from customer_policy",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
app.get("/customer_policy/CID/:customer_policy_id", (req, res) => {
  mysqlConnection.query(
    "select customer_for_id from customer_policy Where customer_policy_id = ?",
    [req.params.customer_policy_id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
app.get("/customer_policy/:customer_for_id", (req, res) => {
  mysqlConnection.query(
    "select policy_id,sumAssred,Installment,year,StartDate,EndDate from customer_policy where customer_for_id=?",
    [req.params.customer_for_id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.get(
  "/customer_policy/:customer_for_id/:policy_id/:sumAssred/:Installment/:year/",
  (req, res) => {
    mysqlConnection.query(
      "select customer_policy_id from customer_policy where customer_for_id = ? and policy_id = ? and sumAssred = ? and Installment = ? and year=?",
      [
        req.params.customer_for_id,
        req.params.policy_id,
        req.params.sumAssred,
        req.params.Installment,
        req.params.year,
      ],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  }
);
app.post("/customer_policy", (req, res) => {
  mysqlConnection.query(
    "insert into customer_policy (customer_for_id,policy_id,sumAssred,Installment,year,StartDate,EndDate) values(?,?,?,?,?,?,?);",
    [
      req.body.customer_for_id,
      req.body.policy_id,
      req.body.sumAssred,
      req.body.Installment,
      req.body.year,
      req.body.StartDate,
      req.body.EndDate,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Insertion Completed");
      else console.log(err);
    }
  );
});

app.put("/customer_policy", (req, res) => {
  //////////baki API LAkhva ni
  mysqlConnection.query(
    "update policy set policy_name=? where policy_id=?",
    [req.body.policy_name, req.body.policy_id],
    (err, rows, fields) => {
      if (!err) res.send("Updation Completed");
      else console.log(err);
    }
  );
});

app.delete("/customer_policy/:customer_policy_id", (req, res) => {
  mysqlConnection.query(
    "delete from customer_policy where customer_policy_id=?",
    [req.params.customer_policy_id],
    (err, rows, fields) => {
      if (!err) res.send("Deletation Completed");
      else console.log(err);
    }
  );
});
////////////////////////////////////////////////////////////////////////
//================================================================================================
//customer_policy_installment API===============================================================================

app.get("/customer_policy_installment", (req, res) => {
  mysqlConnection.query(
    "select * from customer_policy_installment",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.get("/customer_policy_installment/dates", (req, res) => {
  mysqlConnection.query(
    "select customer_policy_id , date from customer_policy_installment",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
app.get("/customer_policy_installment/:id", (req, res) => {
  mysqlConnection.query(
    "select * from customer_policy_installment where id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// app.post("/customer_policy_installment", (req, res) => {
//   mysqlConnection.query(
//     "insert into customer_policy_installment (customer_policy_id,date) values(?,?);",
//     [
//       req.body.customer_policy_id,
//       req.body.date.reduce((result, date) => {
//         if (!result) {
//           return date;
//         }
//         return result + `,"${date}"`;
//       }, ""), // Add an empty string as the initial value
//     ],
//     (err, rows, fields) => {
//       if (!err) res.send("Insertion Completed");
//       else console.log(err);
//     }
//   );
// });

app.post("/customer_policy_installment", (req, res) => {
  mysqlConnection.query(
    "insert into customer_policy_installment (customer_policy_id,date) values(?,?);",
    [
      req.body.customer_policy_id,
      req.body.date.map((date) => `"${date}"`).join(","),
    ],
    (err, rows, fields) => {
      if (!err) res.send("Insertion Completed");
      else console.log(err);
    }
  );
});

app.put("/customer_policy", (req, res) => {
  //////////baki API LAkhva ni
  mysqlConnection.query(
    "update policy set policy_name=? where policy_id=?",
    [req.body.policy_name, req.body.policy_id],
    (err, rows, fields) => {
      if (!err) res.send("Updation Completed");
      else console.log(err);
    }
  );
});

app.delete("/customer_policy_installment/:id", (req, res) => {
  mysqlConnection.query(
    "delete from customer_policy_installment where id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deletation Completed");
      else console.log(err);
    }
  );
});
