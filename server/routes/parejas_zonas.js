const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener todas las parejas en zonas
router.get('/parejas_zonas', (req, res) => {
  const query = `
    SELECT 
      pz.zona_id,
      z.numero_zona,
      t.nombre AS torneo,
      p.id AS pareja_id,
      j1.nombre AS jugador1,
      j2.nombre AS jugador2
    FROM 
      parejas_zonas pz
    INNER JOIN 
      zonas z ON pz.zona_id = z.id
    INNER JOIN 
      torneos t ON z.torneo_id = t.id
    INNER JOIN 
      parejas p ON pz.pareja_id = p.id
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
