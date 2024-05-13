// Importamos los módulos necesarios
const express = require('express');
const api = express.Router();
const cors = require('cors');
const db = require('./database.js');

// Habilitamos CORS para todas las rutas
api.use(cors());

// Usamos el middleware de Express para analizar el cuerpo de las solicitudes como JSON
api.use(express.json());

// Define un endpoint de API que maneja las solicitudes GET a la ruta '/users'
api.get('/users', (req, res) => {
    // Define una consulta SQL que selecciona todos los registros de la tabla 'users'
    let sql = 'SELECT * FROM users';
    // Ejecuta la consulta SQL en la base de datos
    db.query(sql, (err, results) => {
        // Si hay un error durante la ejecución de la consulta, lánzalo
        if (err) throw err;
        // Imprime los resultados de la consulta en la consola
        console.log(results);
        // Envía los resultados de la consulta como respuesta a la solicitud GET
        res.send(results);
    });
});

// Definimos una ruta POST para agregar un usuario
// Función para verificar si un registro ya existe en la base de datos
const checkIfExists = (sql, data) => {
    return new Promise((resolve, reject) => {
        // Ejecuta la consulta SQL
        db.query(sql, data, (err, result) => {
            // Si hay un error, lo rechaza
            if (err) reject(err);
            // Si no hay error, resuelve la promesa con un booleano que indica si el registro existe
            resolve(result.length > 0);
        });
    });
};

// Función para insertar un nuevo usuario en la base de datos
const insertUser = (newUser) => {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO users SET ?';
        // Ejecuta la consulta SQL
        db.query(sql, newUser, (err, result) => {
            // Si hay un error, lo rechaza
            if (err) reject(err);
            // Si no hay error, resuelve la promesa con el resultado de la inserción
            resolve(result);
        });
    });
};

// Ruta POST para agregar un nuevo usuario
api.post('/add', async (req, res) => {
    try {
        const checkUserNameSql = 'SELECT * FROM users WHERE user_name = ?';
        const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
        // Verifica si el nombre de usuario ya existe
        const userNameExists = await checkIfExists(checkUserNameSql, [req.body.user_name]);
        // Verifica si el correo electrónico ya existe
        const emailExists = await checkIfExists(checkEmailSql, [req.body.email]);

        // Si el nombre de usuario ya existe, envía un mensaje de error
        if (userNameExists) {
            res.send({ error: 'Error: este nombre de usuario ya existe' });
        }
        // Si el correo electrónico ya existe, envía un mensaje de error
        else if (emailExists) {
            res.send({ error: 'Error: este correo electrónico ya existe' });
        }
        // Si ni el nombre de usuario ni el correo electrónico existen, inserta el nuevo usuario
        else {
            const newUser = {
                user_name: req.body.user_name,
                full_name: req.body.full_name,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age,
            };
            const result = await insertUser(newUser);
            // Envía el resultado de la inserción
            res.send(result);
        }
    } catch (err) {
        // Si hay un error, lo registra y envía un mensaje de error con un código de estado 500
        console.error(err);
        res.status(500).send({ error: 'Error en el servidor' });
    }
});

// Definimos una ruta DELETE para eliminar un usuario
api.delete('/delete/:username', (req, res) => {
    // Preparamos la consulta SQL para eliminar un usuario
    let sql = `DELETE FROM users WHERE user_name = ?`;
    // Ejecutamos la consulta SQL
    db.query(sql, [req.params.username], (err, result) => {
        // Si hay un error, lo lanzamos
        if (err) throw err;
        // Si no se eliminó ningún usuario, enviamos un error 404
        if (result.affectedRows === 0) {
            res.status(404).send({ error: 'No se encontró el usuario' });
        } else {
            // Si se eliminó un usuario, enviamos una confirmación al cliente
            res.send('Usuario eliminado');
        }
    });
});

// Exportamos el router para usarlo en otro lugar
module.exports = api;