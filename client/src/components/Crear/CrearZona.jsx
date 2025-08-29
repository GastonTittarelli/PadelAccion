import React, { useState } from 'react';
import api from '../../api';

const CrearZona = ({ torneoId, onZonaCreada }) => {
  const [numeroZona, setNumeroZona] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/torneos/${torneoId}/zonas`, {
        numero_zona: numeroZona,
        fecha,
      });
      onZonaCreada(response.data.zona_id); // Notificar al componente principal
    } catch (error) {
      console.error('Error al crear la zona:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={numeroZona} onChange={(e) => setNumeroZona(e.target.value)} placeholder="Número de Zona" />
      <input type="text" value={fecha} placeholder="Fecha" onChange={(e) => setFecha(e.target.value)} />
      <button type="submit">Crear Zona</button>
    </form>
  );
};

export default CrearZona;
