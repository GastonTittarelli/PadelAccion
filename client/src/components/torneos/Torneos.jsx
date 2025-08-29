import { useEffect, useState } from "react";
import api from "../../api";
import "./torneos.css";
import { useAuth } from "../../services/authService";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Torneos = () => {
  const [torneos, setTorneos] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const response = await api.get("/torneos");
        setTorneos(response.data);
      } catch (err) {
        setError("Error al cargar los torneos.");
      }
    };

    fetchTorneos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/torneos/${id}`); // Hacemos la solicitud DELETE
      if (response.status === 200) {
        alert("Torneo eliminado correctamente");
        // Actualiza la lista de torneos después de eliminar uno
        setTorneos((prevTorneos) =>
          prevTorneos.filter((torneo) => torneo.id !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar el torneo:", error);
      alert("Hubo un error al intentar eliminar el torneo.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="containerTorneos">
      <h2 className="torneosTitle">Torneos Disponibles</h2>
      <div className="card-container dark-theme">
        {torneos.map((torneo) => (
          <div key={torneo.id} className="cardTorneo">
            <h2>{torneo.nombre}</h2>
            <p className="fechas">
              {torneo.fecha_inicio} / {torneo.fecha_fin}
            </p>
            <p>Categoría: <strong>{torneo.categoria}</strong></p>

            <Link  to={`/torneo/${torneo.id}`}> 
              <Button className="botonVerTorneo">
                Ver Torneo
              </Button>
            </Link>
            {user?.isAdmin && (
          <div className="specialButtons">

              <Link to={`/torneos/admin/${torneo.id}`}>
                <button
                className="updateButton"
                >Editar</button>
              </Link>

              <button
                className="deleteButton"
                onClick={() => handleDelete(torneo.id)}
              >
                Eliminar
              </button>

          </div>
          )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Torneos;
