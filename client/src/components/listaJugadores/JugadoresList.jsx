import { useEffect, useState } from 'react';
import api from '../../api';
import "./jugadoresList.css"

const JugadoresList = () => {
  const [jugadores, setJugadores] = useState([]);
  const [error, setError] = useState(null);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  useEffect(() => {
    // Utiliza la instancia configurada de Axios
    api.get('/jugadores')
      .then((response) => {
        setJugadores(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener jugadores:', error);
        setError('Error al cargar los jugadores');
      });
  }, []);

  if (error) return <p>{error}</p>;

  const categoriaNumero = categoriaFiltro ? Number(categoriaFiltro) : null;

  const jugadoresFiltrados = jugadores.filter(jugador =>
    jugador.nombre.toLowerCase().includes(nombreFiltro.toLowerCase()) &&
    (categoriaNumero === null || jugador.categoria === categoriaNumero) // Compara con el número
  );
  
  return (
    <div className='containerPlayers'>
      <h2 className='title'>Categoría PadelAccion</h2>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nombreFiltro} 
        onChange={(e) => setNombreFiltro(e.target.value)} 
        className="inputCategoria"/>
      <input 
        type="text" 
        placeholder="Categoría (número)" 
        value={categoriaFiltro} 
        onChange={(e) => setCategoriaFiltro(e.target.value)} 
        className="inputCategoria"/>

      <div className='tableContainer'>
        <div className='subTitles'>
          <h4>Nombre</h4>
          <h4>Categoría</h4>
        </div>
        
        {jugadoresFiltrados.map((jugador) => (
          <div className='players' key={jugador.id}>
            <p className='nombre'>{jugador.nombre}</p>
            <p className='categoriaNum'>{jugador.categoria}</p>
          </div>
        ))}
        
      </div>

    </div>
  );
};

export default JugadoresList;

