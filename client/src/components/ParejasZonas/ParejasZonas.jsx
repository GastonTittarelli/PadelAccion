import React, { useEffect, useState } from "react";
import api from "../../api";  // Asegúrate de tener configurada la instancia de la API
import "./parejasZonas.css";

const ZonasParejas = () => {
  const [zonasParejas, setZonasParejas] = useState([]); // Inicializado como arreglo vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener las zonas y parejas desde la API
    api
      .get(`/parejas_zonas`)
      .then((response) => {
        setZonasParejas(response.data); // Guardar las zonas con las parejas y jugadores
      })
      .catch((error) => {
        console.error("Error al obtener las zonas y parejas:", error);
        setError("Error al obtener las zonas y parejas");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="zonas-parejas-container">
      <h1>Zonas y Parejas</h1>
      {zonasParejas.length > 0 ? (
        zonasParejas.map((zona) => (
          <div key={zona.zona_id} className="zona-card">
            <h2>Zona {zona.numero_zona} </h2>
            <div className="pareja-card">
              <p>{zona.jugador1} - {zona.jugador2}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Cargando zonas y parejas...</p>
      )}
    </div>
  );
};

export default ZonasParejas;
