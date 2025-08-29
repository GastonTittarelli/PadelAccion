import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/authService";
import "./navBar.css";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LoginIcon from '@mui/icons-material/Login';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const Navbar = () => {
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);

  return (
    <nav className="navbar">
      <Link  className="logo" to="/">
        <img src="/padelaccion2.png" alt="Logo Padel Accion" />
      </Link>

      <Box className="caja" sx={{ width: '100%'}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            className="botonCategoria"
            label="Categoría"
            icon={<MilitaryTechIcon className="iconos"/>}
            component={Link}
            to="/jugadores"
          />
          <BottomNavigationAction
          className="botonCategoria"
            label="Torneos"
            icon={<EmojiEventsIcon className="iconos"/>}
            component={Link}
            to="/torneos"
          />
          {user?.isAdmin && (
            <BottomNavigationAction
            className="botonCategoria"
              label="Crear"
              icon={<EditCalendarIcon className="iconos"/>}
              component={Link}
              to="/crear"
            />
          )}
          <BottomNavigationAction
          className="botonCategoria"
            label="Login"
            icon={<LoginIcon className="iconos" />}
            component={Link}
            to="/login"
          />
        </BottomNavigation>
      </Box>
    </nav>
  );
};

export default Navbar;


{/* <nav className="navbar">
      <Link to="/">
        <h1 className="logo">Logo</h1>
      </Link>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/jugadores">Jugadores</Link>
        </li>
        <li className="nav-item">
          <Link to="/torneos">Torneos</Link>
        </li>
        {user?.isAdmin && (
          <li className="nav-item">
            <Link to="/crear">Crear</Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav> */}