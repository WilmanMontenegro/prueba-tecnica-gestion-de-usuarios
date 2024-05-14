// Importamos los módulos necesarios
const express = require('express'); // Express.js para crear el servidor
const routes = require('./userRoutes'); // Nuestras rutas definidas en userRoutes.js
const cors = require('cors'); // CORS para permitir solicitudes de origen cruzado

// Creamos una nueva aplicación Express
const app = express();

// Definimos el puerto en el que se ejecutará nuestro servidor
const port = 5000;

// Usamos el middleware CORS en nuestra aplicación para permitir solicitudes de origen cruzado
app.use(cors());

// Usamos el middleware de análisis de JSON de Express para convertir automáticamente las solicitudes JSON entrantes en objetos JavaScript
app.use(express.json());

// Usamos nuestras rutas definidas en userRoutes.js
app.use('/', routes);

// Hacemos que nuestra aplicación escuche en el puerto definido y registramos un callback para cuando el servidor esté corriendo
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
