// Importamos el módulo 'mysql'
const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const config = {
    host: 'localhost',
    user: 'root',
    password: ''
};

// Nombre de la base de datos
const dbName = 'prueba_tecnica';

// Creamos una conexión a la base de datos
let db;

const connectToDatabase = async () => {
    try {
        db = await mysql.createConnection(config);
        console.log('Conexión a MySQL establecida');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
        throw err;
    }
};

const createDatabase = async () => {
    try {
        await db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log(`Base de datos ${dbName} cargada exitosamente`);
    } catch (err) {
        console.error('Error al crear la base de datos', err);
        throw err;
    }
};

const changeDatabase = async () => {
    try {
        await db.changeUser({database : dbName});
    } catch (err) {
        console.error('Error al cambiar la base de datos', err);
        throw err;
    }
};

const createUsersTable = async () => {
    try {
        const createUsersTableSql = `CREATE TABLE IF NOT EXISTS users(
            user_name VARCHAR(30) NOT NULL PRIMARY KEY,
            full_name VARCHAR(50) NOT NULL,
            email VARCHAR(250) NOT NULL UNIQUE,
            password VARCHAR(64) NOT NULL,
            age TINYINT(3) NOT NULL
        )`;
        await db.query(createUsersTableSql);
    } catch (err) {
        console.error('Error al crear la tabla', err);
        throw err;
    }
};

const insertSampleUsers = async () => {
    try {
        const insertSampleUsersSql = `
            INSERT INTO users (user_name, full_name, email, password, age) VALUES
            ('john_doe', 'John Doe', 'john.doe@example.com', 'jdpassword', 32),
            ('jane_smith', 'Jane Smith', 'jane.smith@example.com', 'jspassword', 28),
            ('robert_johnson', 'Robert Johnson', 'robert.johnson@example.com', 'rjpassword', 35),
            ('michael_brown', 'Michael Brown', 'michael.brown@example.com', 'mbpassword', 30),
            ('linda_garcia', 'Linda Garcia', 'linda.garcia@example.com', 'lgpassword', 27),
            ('james_wilson', 'James Wilson', 'james.wilson@example.com', 'jwpassword', 33),
            ('patricia_miller', 'Patricia Miller', 'patricia.miller@example.com', 'pmpassword', 29),
            ('robert_moore', 'Robert Moore', 'robert.moore@example.com', 'rmpassword', 31),
            ('jennifer_taylor', 'Jennifer Taylor', 'jennifer.taylor@example.com', 'jtpassword', 28),
            ('michael_anderson', 'Michael Anderson', 'michael.anderson@example.com', 'mapassword', 34)
            ON DUPLICATE KEY UPDATE user_name = user_name;
        `;
        await db.query(insertSampleUsersSql);
        console.log('Usuarios de ejemplo insertados correctamente');
    } catch (err) {
        console.error('Error al insertar usuarios de ejemplo', err);
        throw err;
    }
};

const setupDatabase = async () => {
    await connectToDatabase();
    await createDatabase();
    await changeDatabase();
    await createUsersTable();
    await insertSampleUsers();
};

setupDatabase();

// Exportamos la conexión a la base de datos para que pueda ser utilizada en otros módulos
module.exports = db;