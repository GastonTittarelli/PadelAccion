import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import "./torneoCompletoDetail.css";

const TorneoCompletoDetail = () => {
  const { id } = useParams();
  const [torneo, setTorneo] = useState(null);

  useEffect(() => {
    api
      .get(`/torneos/${id}/completo`)
      .then((response) => setTorneo(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!torneo) {
    return <div> </div>;
  }

  return (
    <div className="contenedorTorneoCompleto">
      <div className="contenedorInfoTorneo">
        <h1>Torneo Categoría</h1>
        <p className="categoriaTorneo">Categoría: {torneo.categoria}</p>
        <p>Fecha de inicio: {torneo.fecha_inicio}</p>
        <p>Fecha de fin: {torneo.fecha_fin}</p>
      </div>

      
      <div className="contenedorZonas">
        {torneo.zonas.map((zona) => (
          <div key={zona.id} className="contenedorInfoZonas">
            <h2 className="tituloZona">Zona {zona.numero_zona}</h2>
            <h4 className="fechaZona">Día: {zona.fecha}</h4>
            <div className="enfrentamientos">
              <div className="numerosZona">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
              <div className="parejasZona">
                {zona.parejas.map((pareja, index) => (
                  <p key={`pareja-${zona.id}-${index}`} className="pareja">
                    {pareja.jugador1} - {pareja.jugador2}
                  </p>
                ))}
              </div>
              <div className="numerosEnfrentamientos">
                <p>1-3</p> <p>1-2</p> <p>3-2</p>
              </div>
              <div className="horariosZona">
                {zona.horarios.map((horario, index) => (
                  <p key={`horario-${zona.id}-${index}`} className="horario">
                    {horario.hora}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TorneoCompletoDetail;
