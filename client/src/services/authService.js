import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Asegúrate de que db esté configurado correctamente

// Función para obtener los administradores desde Firestore
const getAdminsFromFirestore = async () => {
  const q = query(collection(db, 'admins')); // Colección de administradores
  const querySnapshot = await getDocs(q);
  const admins = [];
  querySnapshot.forEach((doc) => {
    admins.push(doc.data().email); // Almacenamos los correos electrónicos de los admins
  });
  return admins;
};

// Hook personalizado de autenticación
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Verificar si el correo del usuario está en la lista de administradores
        const admins = await getAdminsFromFirestore();
        if (admins.includes(currentUser.email)) {
          // Si el usuario es un administrador, lo asignamos como tal
          setUser({ ...currentUser, isAdmin: true });
        } else {
          // Si no es administrador, asignamos isAdmin como false
          setUser({ ...currentUser, isAdmin: false });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};
