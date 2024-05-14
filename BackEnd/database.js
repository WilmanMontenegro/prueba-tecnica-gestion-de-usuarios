// Importamos el módulo 'mysql'
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const config = {
    host: 'localhost',
    user: 'root',
    password: ''
};

// Nombre de la base de datos
const dbName = 'prueba_tecnica';

// Creamos una conexión a la base de datos
const db = mysql.createConnection(config);

// Función para manejar la conexión a la base de datos
const handleDatabaseConnection = (err) => {
    // Si hay un error durante la conexión, lo lanzamos
    if(err) throw err;
    console.log('Conexión a MySQL establecida');

    // Creamos la base de datos si no existe
    db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, handleDatabaseCreation);
};

// Función para manejar la creación de la base de datos
const handleDatabaseCreation = (err) => {
    // Si hay un error durante la creación de la base de datos, lo mostramos
    if(err) {
        console.log(err.message);
    } else {
        console.log(`Base de datos ${dbName} cargada exitosamente`);
        // Cambiamos a la base de datos recién creada
        db.changeUser({database : dbName}, handleDatabaseChange);
    }
};

// Función para manejar el cambio de base de datos
const handleDatabaseChange = (err) => {
    // Si hay un error durante el cambio de base de datos, lo mostramos
    if (err) {
        console.log('error al cargar la base de datos', err);
        return;
    }

    // Creamos la tabla 'users' si no existe
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
        user_name VARCHAR(30) NOT NULL PRIMARY KEY,
        full_name VARCHAR(50) NOT NULL,
        email VARCHAR(250) NOT NULL UNIQUE,
        password VARCHAR(64) NOT NULL,
        age TINYINT(3) NOT NULL
    )`;

    // Ejecutamos la consulta para crear la tabla
    db.query(createUsersTable, handleTableCreation);
};

// Función para manejar la creación de la tabla
const handleTableCreation = (err) => {
    // Si hay un error durante la creación de la tabla, lo mostramos
    if(err) {
        console.log(err.message);
    }
};

// Intentamos conectar a la base de datos
db.connect(handleDatabaseConnection);

// Exportamos la conexión a la base de datos para que pueda ser utilizada en otros módulos
module.exports = db;