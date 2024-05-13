// Importamos el módulo 'mysql' para poder interactuar con una base de datos MySQL
const mysql = require('mysql');

// Creamos una conexión a la base de datos usando el método 'createConnection' de 'mysql'
// y proporcionamos los detalles necesarios como el host, el usuario, la contraseña y el nombre de la base de datos
const db = mysql.createConnection({
    host: 'localhost', // El host donde se encuentra la base de datos, en este caso es la misma máquina
    user: 'root', // El usuario para conectarse a la base de datos
    password: '', // La contraseña del usuario
    database: 'prueba_tecnica' // El nombre de la base de datos a la que queremos conectarnos
});

// Intentamos conectar a la base de datos. Si hay un error durante la conexión, lo lanzamos.
// Si no hay errores, mostramos un mensaje en la consola indicando que la conexión ha sido establecida
db.connect((err) => {
    if(err) {
      throw err; // Si hay un error, lo lanzamos
    }
    console.log('Conexión a la base de datos establecida'); // Si no hay errores, mostramos este mensaje
});

// Exportamos la conexión a la base de datos para que pueda ser utilizada en otros módulos
module.exports = db;