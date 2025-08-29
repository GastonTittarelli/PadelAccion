import React, { useEffect, useState } from "react";
import api from "../../api"; 
import "./parejas.css";

const Parejas = () => {
  const [parejas, setParejas] = useState([]); // Inicializado como un arreglo vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener las parejas desde la API
    api
      .get(`/parejas`)
      .then((response) => {
        setParejas(response.data); // Guardar el arreglo de parejas
      })
      .catch((error) => {
        console.error("Error al obtener las parejas:", error);
        setError("Error al obtener las parejas");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="parejas-container">
      <h1>Parejas</h1>
      {parejas.length > 0 ? (
        parejas.map((pareja) => (
          <div key={pareja.pareja_id} className="pareja-card">
            <p>{pareja.jugador1} - {pareja.jugador2}</p>
          </div>
        ))
      ) : (
        <p>Cargando parejas...</p>
      )}
    </div>
  );
};

export default Parejas;
