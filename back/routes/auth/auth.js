const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const connection = require("../../helpers/db");

router.post("/signup", (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const { email, name, lastname } = req.body;
  const userValue = [email, hash, name, lastname];
  connection.query(
    "INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)",
    userValue,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ flash: err.message });
      } else {
        res.status(200).json({ flash: "User has been signed up!" });
      }
    }
  );
});

router.post("/signin", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({ message: info.message });
    const token = jwt.sign(JSON.stringify(user), "your_jwt_secret");
    return res.json({ user, token });
  })(req, res);
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
