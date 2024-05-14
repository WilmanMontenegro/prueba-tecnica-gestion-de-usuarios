// db.js
const mysql = require('mysql');

// Crear conexión a MySQL sin especificar la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a MySQL exitosa');

    // Crear la base de datos si no existe
    db.query('CREATE DATABASE IF NOT EXISTS prueba_tecnica', (err, results) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Base de datos creada o ya existente');
        }
    });

    // Usar la base de datos
    db.query('USE prueba_tecnica', (err, results) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Usando la base de datos prueba_tecnica');
        }
    });

    // Crear la tabla users si no existe
    let createUsersTable = `CREATE TABLE IF NOT EXISTS users(
    user_name VARCHAR(30) NOT NULL PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    age TINYINT(3) NOT NULL,
    sex CHAR(1) NOT NULL
    )`;

    db.query(createUsersTable, (err, results, fields) => {
        if (err) {
            console.log(err.message);
        }
    });

    // Insertar datos de prueba
    let insertUsers = `INSERT IGNORE INTO users (user_name, full_name, email, password, age, sex)
                     VALUES ('juan.perez', 'Juan Perez', 'juan.perez@example.com', 'password', 30, 'M'),
                            ('maria.rodriguez', 'Maria Rodriguez', 'maria.rodriguez@example.com', 'password', 25, 'F'),
                            ('carlos.gomez', 'Carlos Gomez', 'carlos.gomez@example.com', 'password', 35, 'M'),
                            ('laura.lopez', 'Laura Lopez', 'laura.lopez@example.com', 'password', 28, 'F'),
                            ('david.martinez', 'David Martinez', 'david.martinez@example.com', 'password', 32, 'M')`;

    db.query(insertUsers, (err, results, fields) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Datos de prueba insertados en la tabla users si no existían previamente');
        }
    });

    console.log('Tabla users creada o ya existente');
});

// Función para obtener usuarios
function getUsers(callback) {
    db.query('SELECT * FROM users', (err, rows) => {
        if (err) throw err;
        callback(rows);
    });
}

function addUser(user, callback) {
    db.query('SELECT * FROM users WHERE user_name = ?', [user.user_name], (err, rows) => {
        if (err) throw err;
        if (rows.length) {
            callback(null, 'El nombre de usuario ya existe');
        } else {
            db.query('SELECT * FROM users WHERE email = ?', [user.email], (err, rows) => {
                if (err) throw err;
                if (rows.length) {
                    callback(null, 'El correo electrónico ya existe');
                } else {
                    db.query('INSERT INTO users SET ?', user, (err, result) => {
                        if (err) throw err;
                        callback(result);
                    });
                }
            });
        }
    });
}

module.exports = {
    getUsers,
    addUser
};