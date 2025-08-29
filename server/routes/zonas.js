const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener todas las zonas
router.get('/zonas', (req, res) => {
  const query = `
    SELECT 
      z.id AS zona_id,
      z.numero_zona,
      z.fecha,
      t.nombre AS torneo
    FROM 
      zonas z
    INNER JOIN 
      torneos t ON z.torneo_id = t.id
  `;

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


module.exports = router;
