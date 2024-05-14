// Importamos el módulo mysql
const mysql = require('mysql');

// Creamos una conexión a MySQL sin especificar la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

// Nos conectamos a MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a MySQL exitosa');

    // Creamos la base de datos si no existe
    db.query('CREATE DATABASE IF NOT EXISTS prueba_tecnica', (err, results) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Base de datos creada o ya existente');

            // Usamos la base de datos
            db.query('USE prueba_tecnica', (err, results) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log('Usando la base de datos prueba_tecnica');

                    // Creamos la tabla users si no existe
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
                        } else {
                            console.log('Tabla users creada o ya existente');
                        }
                    });
                }
            });
        }
    });
});

// Función para obtener usuarios
function getUsers(callback) {
    db.query('SELECT * FROM users', (err, rows) => {
        if (err) throw err;
        callback(rows);
    });
}

// Función para insertar un usuario
function addUser(user, callback) {
    db.query('SELECT * FROM users WHERE user_name = ?', [user.user_name], (err, rows) => {
        if (err) throw err;
        if (rows.length) {
            callback({ error: 'El nombre de usuario ya existe' });
        } else {
            db.query('SELECT * FROM users WHERE email = ?', [user.email], (err, rows) => {
                if (err) throw err;
                if (rows.length) {
                    callback({ error: 'El correo electrónico ya existe' });
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

// Función para eliminar un usuario
function deleteUser(user_name, callback) {
    db.query('DELETE FROM users WHERE user_name = ?', [user_name], (err, result) => {
      if (err) throw err;
      callback(result);
    });
}

// Exportamos las funciones para que puedan ser usadas en otros archivos
module.exports = {
    getUsers,
    addUser,
    deleteUser
};