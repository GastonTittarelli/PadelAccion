import React, { useState, useEffect } from 'react';
import api from '../../api';

const CrearParejas = ({ zonaId, onParejaCreada }) => {
  const [jugador1Id, setJugador1Id] = useState('');
  const [jugador2Id, setJugador2Id] = useState('');
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const response = await api.get('/jugadores'); // Obtener jugadores
        setJugadores(response.data);
      } catch (error) {
        console.error('Error al obtener jugadores:', error);
      }
    };
    fetchJugadores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/zonas/${zonaId}/parejas`, {
        jugador1_id: jugador1Id,
        jugador2_id: jugador2Id,
      });
      onParejaCreada(response.data.pareja_id); // Notificar al componente principal
    } catch (error) {
      console.error('Error al crear la pareja:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={jugador1Id} onChange={(e) => setJugador1Id(e.target.value)}>
        {jugadores.map((jugador) => (
          <option key={jugador.id} value={jugador.id}>
            {jugador.nombre}
          </option>
        ))}
      </select>
      <select value={jugador2Id} onChange={(e) => setJugador2Id(e.target.value)}>
        {jugadores.map((jugador) => (
          <option key={jugador.id} value={jugador.id}>
            {jugador.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Crear Pareja</button>
    </form>
  );
};

export default CrearParejas;
