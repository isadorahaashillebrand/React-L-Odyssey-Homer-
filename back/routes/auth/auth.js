const express = require("express");
const router = express.Router();
const connection = require("../../helpers/db");

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const formData = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ flash: err.message });
    } else {
      res.status(200).json({ flash: "User has been signed up!" });
    }
  });
});

router.get("/signup", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
