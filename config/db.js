const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

// CONFIGURACION MYSQL CON VARIABLES DE ENTORNO
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando con MySQL', err.message);
    } else {
        console.log('MySQL conectado');
    }
});

// CONFIGURACION MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo Conectado'))
    .catch(err => console.error('Error conectando con Mongo', err));

module.exports = { db };