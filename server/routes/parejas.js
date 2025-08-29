const express = require('express');
const router = express.Router();
const connection = require('../db'); // Archivo de configuración de MySQL

// Ruta para obtener todas las parejas
router.get('/parejas', (req, res) => {
  const query = `
    SELECT 
      p.id AS pareja_id,
      t.nombre AS torneo,
      j1.nombre AS jugador1,
      j2.nombre AS jugador2
    FROM 
      parejas p
    INNER JOIN 
      torneos t ON p.torneo_id = t.id
    INNER JOIN 
      jugadores j1 ON p.jugador1_id = j1.id
    INNER JOIN 
      jugadores j2 ON p.jugador2_id = j2.id
  `;

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

module.exports = router;

