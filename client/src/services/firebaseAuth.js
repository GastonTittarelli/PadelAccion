import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Asegúrate de que auth esté configurado correctamente

// Función para iniciar sesión con Google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return user; // Regresa el usuario autenticado
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  }
};
