const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db');


router.post('/signup', (req, res, next) => {
  const { email, password, name, lastname } = req.body;
  connection.query(
    "INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)",
    [email, password, name, lastname],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a movie");
      } else {
        res.status(200).send("Successfully saved");
      }
    }
  );
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