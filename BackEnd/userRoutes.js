// routes.js
const express = require('express');
const router = express.Router();
const db = require('./database');

router.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

router.get('/users', (req, res) => {
  db.getUsers((users) => {
    res.json(users);
  });
});

router.post('/add', (req, res) => {
    db.addUser(req.body, (result, error) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.json(result);
      }
    });
  });

module.exports = router;
