import React from 'react';
import { loginWithGoogle } from '../../services/firebaseAuth';
import { useAuthContext } from '../../services/authContext'; 
import "./login.css";

const Login = () => {
  const { user, logout, isLoading } = useAuthContext(); 

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Usamos la función loginWithGoogle
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };



  return (
    <div className='loginContainer'>
      <div className='imagenLogin'>
        <img className='ball' src="/imagen2.1b.png" alt="" />
        <img className='men' src="/imagen2.1a.png" alt="" />
      </div>

      <div className='loginBotones'>
        {user ? (
          <div className='gestionUsuario'> 
            <p className='usuario'>Bienvenido, <strong>{user.displayName}</strong>!</p>
            
            <button className='logoutBoton' onClick={logout}>Cerrar sesión</button>
          </div>
        ) : (
          <div className='loginBoton'>
            <img src="/googleIcon.png" alt="" />
            <p onClick={handleGoogleLogin}>Login con Google</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
