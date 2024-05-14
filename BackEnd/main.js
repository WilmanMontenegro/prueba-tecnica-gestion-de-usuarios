// server.js
const express = require('express');
const routes = require('./userRoutes');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); // Habilita CORS para todas las rutas

// Tus rutas van aquí

app.use(express.json());
app.use('/', routes);


app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
