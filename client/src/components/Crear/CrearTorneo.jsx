import React, { useState } from 'react';
import api from '../../api';

const CrearTorneo = ({ onTorneoCreado }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/torneos', {
        nombre,
        categoria,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      });
      onTorneoCreado(response.data.id); // Notificar al componente principal
    } catch (error) {
      console.error('Error al crear el torneo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del Torneo" />
      <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoría" />
      <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
      <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
      <button type="submit">Crear Torneo</button>
    </form>
  );
};

export default CrearTorneo;
