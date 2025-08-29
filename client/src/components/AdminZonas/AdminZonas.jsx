import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import api from "../../api";

const ZonasAdmin = () => {
  const [jugadores, setJugadores] = useState([]);
  const [zona, setZona] = useState({
    numero_zona: "",
    fecha: "",
    parejas: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch jugadores desde la API
    api
      .get("/jugadores") // Reemplaza con tu endpoint de jugadores
      .then((response) => setJugadores(response.data))
      .catch((err) => console.error("Error al cargar jugadores", err));
  }, []);

  const handleAddPareja = () => {
    if (zona.parejas.length < 3) {
      setZona((prevZona) => ({
        ...prevZona,
        parejas: [...prevZona.parejas, { jugador1: "", jugador2: "" }],
      }));
    } else {
      setError("No se pueden agregar más de 3 parejas.");
    }
  };

  const handleChangePareja = (index, jugador, value) => {
    const nuevasParejas = zona.parejas.map((pareja, idx) =>
      idx === index ? { ...pareja, [jugador]: value } : pareja
    );
    setZona((prevZona) => ({ ...prevZona, parejas: nuevasParejas }));
  };

  const handleSubmit = () => {
    if (
      zona.parejas.length < 2 ||
      zona.parejas.some((p) => !p.jugador1 || !p.jugador2)
    ) {
      setError("Cada pareja debe tener dos jugadores y deben ser al menos 2 parejas.");
      return;
    }
    if (!zona.numero_zona || !zona.fecha) {
      setError("La zona debe tener una letra y una fecha.");
      return;
    }

    // Envía la zona a la API
    api
      .post("/zonas", zona) // Reemplaza con tu endpoint de zonas
      .then(() => {
        setZona({ numero_zona: "", fecha: "", parejas: [] });
        setError("");
        alert("Zona creada con éxito");
      })
      .catch((err) => console.error("Error al crear la zona", err));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Crear Zona
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Letra de la zona</InputLabel>
        <Select
          value={zona.numero_zona}
          onChange={(e) => setZona({ ...zona, numero_zona: e.target.value })}
        >
          {["A", "B", "C", "D", "E", "F"].map((letra) => (
            <MenuItem key={letra} value={letra}>
              {letra}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Fecha"
        type="text"
        placeholder="dd/mm"
        value={zona.fecha}
        onChange={(e) => setZona({ ...zona, fecha: e.target.value })}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {zona.parejas.map((pareja, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Jugador 1</InputLabel>
            <Select
              value={pareja.jugador1}
              onChange={(e) =>
                handleChangePareja(index, "jugador1", e.target.value)
              }
            >
              {jugadores.map((jugador) => (
                <MenuItem key={jugador.id} value={jugador.id}>
                  {jugador.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Jugador 2</InputLabel>
            <Select
              value={pareja.jugador2}
              onChange={(e) =>
                handleChangePareja(index, "jugador2", e.target.value)
              }
            >
              {jugadores.map((jugador) => (
                <MenuItem key={jugador.id} value={jugador.id}>
                  {jugador.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPareja}
        sx={{ marginBottom: 2 }}
      >
        Agregar Pareja
      </Button>

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Crear Zona
      </Button>
    </Box>
  );
};

export default ZonasAdmin;
