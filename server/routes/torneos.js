const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener todos los torneos
router.get('/torneos', (req, res) => {
  const query = 'SELECT * FROM torneos';
  
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


// Ruta para crear un nuevo torneo
router.post('/torneos', (req, res) => {
  const { nombre, categoria, fecha_inicio, fecha_fin } = req.body;

  // Validación básica de datos
  if (!nombre || !categoria || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO torneos (nombre, categoria, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, categoria, fecha_inicio, fecha_fin], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({
      id: results.insertId,
      nombre,
      categoria,
      fecha_inicio,
      fecha_fin,
    });
  });
});


// Ruta para agregar zonas a un torneo
router.post('/torneos/:torneoId/zonas', (req, res) => {
  const { torneoId } = req.params;
  const { zonas } = req.body; // Espera un array de zonas, e.g., ['A', 'B', 'C']

  if (!zonas || !Array.isArray(zonas)) {
    return res.status(400).json({ error: 'El campo zonas es obligatorio y debe ser un array' });
  }

  const values = zonas.map((zona) => [torneoId, zona]);
  const query = 'INSERT INTO zonas (torneo_id, numero_zona) VALUES ?';

  connection.query(query, [values], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Zonas agregadas correctamente', zonas });
  });
});

// Ruta para obtener las zonas de un torneo específico
router.get('/torneos/:id/zonas', (req, res) => {
  const { torneoId } = req.params;

  const query = 'SELECT * FROM zonas WHERE torneo_id = ?';
  connection.query(query, [torneoId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Ruta para obtener el torneo y la cantidad de zonas
router.get('/torneos/:id', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
  t.id,
  t.nombre,
  t.categoria,
  t.fecha_inicio,
  t.fecha_fin,
  JSON_ARRAYAGG(
    JSON_OBJECT('numero_zona', z.numero_zona)
  ) AS zonas
FROM torneos t
LEFT JOIN zonas z ON t.id = z.torneo_id
WHERE t.id = ?
GROUP BY t.id;
  `;

  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }
    res.json(results[0]);
  });
});


// Ruta para eliminar un torneo
router.delete('/torneos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM torneos WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Torneo eliminado correctamente' });
  });
});

// En tu archivo de rutas de torneos
router.get('/:torneoId/zonas', (req, res) => {
  const torneoId = req.params.torneoId;
  const query = 'SELECT * FROM zonas WHERE torneo_id = ?';
  
  connection.query(query, [torneoId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results); // Devolver las zonas asociadas al torneo
  });
});

router.get('/torneos/:id/completo', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      t.id AS torneo_id,
      t.nombre AS torneo_nombre,
      t.categoria,
      t.fecha_inicio,
      t.fecha_fin,
      z.id AS zona_id,
      z.numero_zona,
      z.fecha AS zona_fecha,
      p.id AS pareja_id,
      j1.nombre AS jugador1,
      j2.nombre AS jugador2,
      h.id AS horario_id,
      h.hora AS horario_hora
    FROM torneos t
    LEFT JOIN zonas z ON t.id = z.torneo_id
    LEFT JOIN parejas_zonas pz ON z.id = pz.zona_id
    LEFT JOIN parejas p ON pz.pareja_id = p.id
    LEFT JOIN jugadores j1 ON p.jugador1_id = j1.id
    LEFT JOIN jugadores j2 ON p.jugador2_id = j2.id
    LEFT JOIN horarios h ON z.id = h.zona_id
    WHERE t.id = ?
    ORDER BY z.numero_zona, p.id, h.hora;
  `;

  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    // Formatear los datos en una estructura jerárquica
    const torneo = {
      id: results[0].torneo_id,
      nombre: results[0].torneo_nombre,
      categoria: results[0].categoria,
      fecha_inicio: results[0].fecha_inicio,
      fecha_fin: results[0].fecha_fin,
      zonas: [],
    };

    const zonasMap = {};

    results.forEach((row) => {
      if (!zonasMap[row.zona_id]) {
        zonasMap[row.zona_id] = {
          id: row.zona_id,
          numero_zona: row.numero_zona,
          fecha: row.zona_fecha,
          parejas: [],
          horarios: [],
        };
        torneo.zonas.push(zonasMap[row.zona_id]);
      }

      if (row.pareja_id && !zonasMap[row.zona_id].parejas.some((p) => p.id === row.pareja_id)) {
        zonasMap[row.zona_id].parejas.push({
          id: row.pareja_id,
          jugador1: row.jugador1,
          jugador2: row.jugador2,
        });
      }

      if (row.horario_id && !zonasMap[row.zona_id].horarios.some((h) => h.id === row.horario_id)) {
        zonasMap[row.zona_id].horarios.push({
          id: row.horario_id,
          hora: row.horario_hora.slice(0, 5),
        });
      }

    });

    
    res.json(torneo);
  });
});




module.exports = router;
