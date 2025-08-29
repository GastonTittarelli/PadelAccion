import React, { useEffect, useState } from "react";
import api from "../../api"; // Asegúrate de que la configuración de "api" esté correctamente configurada
import "./zonas.css";

const Zonas = () => {
  const [zonas, setZonas] = useState([]); // Inicializado como un arreglo vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener las zonas desde la API
    api
      .get(`/zonas`)
      .then((response) => {
        setZonas(response.data); // Guardar el arreglo de zonas
      })
      .catch((error) => {
        console.error("Error al obtener las zonas:", error);
        setError("Error al obtener las zonas");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="zonas-container">
      <h1>Zonas</h1>
      {zonas.length > 0 ? (
        zonas.map((zona) => (
          <div key={zona.zona_id} className="zona-card">
            <h2>Zona {zona.numero_zona}</h2>
            <p>Fecha: {zona.fecha}</p>
            <div className="distribucion">
              <p>1</p> <p>pareja</p> <p>1-3</p>
              <p>2</p> <p>pareja</p> <p>1-2</p>
              <p>3</p> <p>pareja</p> <p>3-2</p>
            </div>
          </div>
        ))
      ) : (
        <p>Cargando zonas...</p>
      )}
    </div>
  );
};

export default Zonas;
