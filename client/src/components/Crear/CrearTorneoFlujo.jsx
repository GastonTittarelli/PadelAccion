import React, { useState } from 'react';
// import CrearTorneo from './CrearTorneo';
import CrearZona from './CrearZona';
import CrearParejas from './CrearParejas';
import CrearHorarios from './CrearHorarios';
import AdminTorneos from '../AdminTorneos/AdminTorneos';
import CrearTorneo from '../AdminTorneos/AdminTorneos';

const CrearTorneoFlujo = () => {
  const [torneoId, setTorneoId] = useState(null);
  const [zonaId, setZonaId] = useState(null);
  const [paso, setPaso] = useState(1);

  const onTorneoCreado = (id) => {
    setTorneoId(id);
    setPaso(2);
  };

  const onZonaCreada = (id) => {
    setZonaId(id);
    setPaso(3);
  };

  const onParejaCreada = () => {
    setPaso(4);
  };

  return (
    <div>
      {paso === 1 && <CrearTorneo onTorneoCreado={onTorneoCreado} />}
      {paso === 2 && <CrearZona torneoId={torneoId} onZonaCreada={onZonaCreada} />}
      {paso === 3 && <CrearParejas zonaId={zonaId} onParejaCreada={onParejaCreada} />}
      {paso === 4 && <CrearHorarios zonaId={zonaId} />}
    </div>
  );
};

export default CrearTorneoFlujo;
