// Importamos express y creamos un router
const express = require('express');
const router = express.Router();

// Importamos nuestro módulo de base de datos
const db = require('./database');

// Ruta de inicio que devuelve un mensaje de '¡Hola Mundo!'
router.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Ruta que devuelve todos los usuarios
router.get('/users', (req, res) => {
  // Llamamos a la función getUsers de nuestro módulo de base de datos
  db.getUsers((users) => {
    // Devolvemos los usuarios como JSON
    res.json(users);
  });
});

// Ruta para añadir un usuario
router.post('/add', (req, res) => {
  // Llamamos a la función addUser de nuestro módulo de base de datos
  db.addUser(req.body, (result, error) => {
    // Si hay un error, devolvemos un estado 400 y el error
    if (error) {
      res.status(400).json({ error });
    } else {
      // Si no hay error, devolvemos el resultado
      res.json(result);
    }
  });
});

// Ruta para eliminar un usuario
router.delete('/delete/:user_name', (req, res) => {
  // Llamamos a la función deleteUser de nuestro módulo de base de datos
  db.deleteUser(req.params.user_name, (result) => {
    // Devolvemos el resultado
    res.json(result);
  });
});

// Exportamos el router para usarlo en otros archivos
module.exports = router;