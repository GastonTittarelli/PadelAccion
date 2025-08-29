const express = require('express');
const router = express.Router();
const connection = require('../db');  // Archivo de configuración de MySQL

// Ruta para obtener todos los jugadores
router.get('/jugadores', (req, res) => {
  const query = 'SELECT * FROM jugadores';

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

module.exports = router;