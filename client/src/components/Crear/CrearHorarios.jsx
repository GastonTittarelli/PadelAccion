import React, { useState } from 'react';
import api from '../../api';

const CrearHorarios = ({ zonaId }) => {
  const [hora, setHora] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/zonas/${zonaId}/horarios`, { hora });
      setHora(''); // Limpiar el campo después de agregar
    } catch (error) {
      console.error('Error al agregar el horario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
      <button type="submit">Agregar Horario</button>
    </form>
  );
};

export default CrearHorarios;
