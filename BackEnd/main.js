// Importamos los módulos necesarios
const express = require('express'); // Importamos el módulo express para crear y manejar el servidor
const db = require('./database.js'); // Importamos el módulo de la base de datos
const userRoutes = require('./userRoutes.js'); // Importamos las rutas de usuario

const app = express(); // Creamos una nueva aplicación Express
const port = 5000; // Definimos el puerto en el que se ejecutará el servidor

// Definimos una ruta GET para la raíz ("/") de nuestro servidor
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!'); // Cuando se accede a esta ruta, el servidor responde con "¡Hola Mundo!"
});

// Definimos una ruta GET para "/data"
app.get('/data', (req, res) => {
  let sql = 'SELECT * FROM users'; // La consulta SQL para obtener todos los usuarios
  db.query(sql, (err, result) => { // Ejecutamos la consulta
    if(err){
      // Si hay un error, enviamos una respuesta con código de estado 500 y un mensaje de error
      res.status(500).send({ error: 'Algo salió mal en el servidor' });
      return;
    }
    console.log(result); // Imprimimos el resultado en la consola
    res.send(result); // Enviamos el resultado como respuesta
  });
});

app.use(userRoutes); // Utilizamos las rutas de usuario que importamos anteriormente

// Iniciamos el servidor en el puerto definido anteriormente
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`); // Imprimimos un mensaje en la consola para indicar que el servidor está corriendo
});