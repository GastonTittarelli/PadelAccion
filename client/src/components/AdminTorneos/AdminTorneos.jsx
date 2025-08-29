import { useState } from "react";
import api from "../../api";
import "./adminTorneos.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AdminTorneos = () => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [zonas, setZonas] = useState([]); // Zonas del torneo
  const [zonaInput, setZonaInput] = useState(""); // Input temporal para agregar una zona
  const navigate = useNavigate();

  // Opciones disponibles para cada tipo de torneo
  const opcionesCategorias = {
    "Torneo Categoria": [4, 5, 6, 7, 8],
    "Torneo Loco": [0],
    "Torneo Suma": [9, 10, 11, 12, 13, 14, 15],
  };

  // Obtén las opciones dinámicas según el nombre seleccionado
  const opcionesDisponibles = nombre ? opcionesCategorias[nombre] || [] : [];

  // const agregarZona = () => {
  //   if (zonaInput.trim() && !zonas.includes(zonaInput.trim())) {
  //     setZonas([...zonas, zonaInput.trim()]);
  //     setZonaInput("");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoTorneo = {
      nombre,
      categoria,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    try {
      // Crear el torneo
      const response = await api.post("/torneos", nuevoTorneo);
      // const torneoId = response.data.id;

      // Agregar zonas al torneo creado
      // if (zonas.length > 0) {
      //   await api.post(`/torneos/${torneoId}/zonas`, { zonas });
      // }

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Torneo creado Exitosamente",
        showConfirmButton: false,
        timer: 2500
      });

      
      navigate("/torneos");

    } catch (error) {
      console.error("Error al crear el torneo:", error);
      
      Swal.fire({
        title: "Hubo un problema al crear el torneo",
        text: error.message || "Intenta nuevamente más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div>
    <div className="crear-torneo">
      <h2 className="crear-torneo__titulo">Crear Torneo</h2>
      {mensaje && <p className="crear-torneo__mensaje">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="crear-torneo__form">
        <div className="crear-torneo__campo">
          <label className="crear-torneo__label">Nombre del torneo:</label>
          <select
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setCategoria("");
            }}
            className="crear-torneo__select"
          >
            <option value="">Seleccione un torneo</option>
            <option value="Torneo Categoria">Torneo Categoria</option>
            <option value="Torneo Loco">Torneo Loco</option>
            <option value="Torneo Suma">Torneo Suma</option>
          </select>
        </div>

        <div className="crear-torneo__campo">
          <label className="crear-torneo__label">Categoría:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            disabled={!nombre}
            className="crear-torneo__select"
          >
            <option value="">Seleccione una categoría</option>
            {opcionesDisponibles.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div className="crear-torneo__campo">
          <label className="crear-torneo__label">Fecha de inicio:</label>
          <input
            type="text"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            placeholder="DD-MM"
            required
            className="crear-torneo__input"
          />
        </div>

        <div className="crear-torneo__campo">
          <label className="crear-torneo__label">Fecha de fin:</label>
          <input
            type="text"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            placeholder="DD-MM"
            required
            className="crear-torneo__input"
          />
        </div>

        <button type="submit" className="crear-torneo__boton">
          Crear Torneo
        </button>
      </form>

    </div>
      
    </div>
  );
};

export default AdminTorneos;
