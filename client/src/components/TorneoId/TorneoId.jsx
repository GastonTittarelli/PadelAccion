import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import "./torneoId.css"; 

const TorneoId = () => {
  const { torneoId } = useParams();
  const [torneo, setTorneo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const response = await api.get(`/torneos/${torneoId}`);
        setTorneo(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del torneo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTorneo();
  }, [torneoId]);

  if (loading) return <p>Cargando torneo...</p>;
  if (!torneo) return <p>No se encontró el torneo.</p>;

  return (
    <div className="torneo-container">
      <h2 className="torneo-title">{torneo.nombre}</h2>
      <p><strong>Categoría:</strong> {torneo.categoria}</p>
      <p><strong>Fecha de Inicio:</strong> {torneo.fecha_inicio}</p>
      <p><strong>Fecha de Fin:</strong> {torneo.fecha_fin}</p>
      
      <h3 className="zonas-title">Zonas</h3>
      <div className="zonas-container">
        {torneo.zonas && torneo.zonas.length > 0 ? (
          torneo.zonas.map((zona) => (
            <div key={zona.numero_zona} className="zona-card">
              <strong>Número de Zona:</strong> {zona.numero_zona}
            </div>
          ))
        ) : (
          <p>No hay zonas registradas para este torneo.</p>
        )}
      </div>
    </div>
  );
};

export default TorneoId;
