import { Routes, Route } from "react-router-dom";
import "./App.css";
import JugadoresList from "./components/listaJugadores/JugadoresList";
import Navbar from "./components/navBar/Navbar";
import Torneos from "./components/torneos/Torneos";
// import IndividualTorneo from './components/IndividualTorneo/IndividualTorneo';
// import Zonas from './components/zonas/Zonas';
// import AdminTorneos from './components/AdminTorneos/AdminTorneos';
// import Zonas from './components/zonas/Zonas';
// import AdminZonas from './components/AdminZonas/AdminZonas';
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute";
import { AuthProvider } from "./services/authContext";
// import TorneoId from './components/TorneoId/TorneoId';
import ZonasAdmin from "./components/AdminZonas/AdminZonas";
import Zonas from "./components/zonas/Zonas";
import Parejas from "./components/parejas/Parejas";
import ZonasParejas from "./components/ParejasZonas/ParejasZonas";
import TorneoCompletoDetail from "./components/TorneoCompletoDetail/TorneoCompletoDetail";
import CrearTorneoFlujo from "./components/Crear/CrearTorneoFlujo";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/jugadores" element={<JugadoresList />} />
          <Route path="/torneos" element={<Torneos />} />
          <Route
            path="/crear"
            element={<ProtectedRoute element={<CrearTorneoFlujo />} adminOnly/>}
          />
          {/* <Route path="/torneos/:torneoId" element={<TorneoId />} /> */}
          <Route path="/torneo/:id" element={<TorneoCompletoDetail />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
          path="/crear"
          element={
            <ProtectedRoute element={<AdminTorneos />} adminOnly />
          }
        /> */}
          <Route
            path="/torneos/admin/:torneoId"
            element={<ProtectedRoute element={<ZonasAdmin />} adminOnly />}
          />
          {/* <Route
          path="/crear/zonas/:torneoId"
          element={
            <ProtectedRoute element={<AdminZonas />} adminOnly />
          }
        /> */}
          {/* <Route path="/crear/zonas/:torneoId" element={<AdminZonas />} /> */}
          <Route path="/zonas" element={<Zonas />} />
          <Route path="/parejas" element={<Parejas />} />
          <Route path="/zonasParejas" element={<ZonasParejas />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
