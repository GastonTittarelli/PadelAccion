require('dotenv').config();
const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Cambia esto si tu base de datos está alojada en la nube
  user: process.env.DB_USER, // El usuario de tu base de datos
  password: process.env.DB_PASSWORD, // La contraseña de tu base de datos
  database: process.env.DB_NAME, // El nombre de la base de datos
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
