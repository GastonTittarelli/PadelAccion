
# 📱 Padel Manager

Aplicación web en proceso de desarrollo, pensada principalmente para **vista mobile**, que permite **gestionar torneos de pádel**.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React + CSS + Material UI  
- **Backend**: Node.js + MySQL  
- **Autenticación**: Firebase Authentication (login con Google + validación de administradores en Firestore)  
- **Base de datos**: MySQL  
- **Gestión de estado**: Context API para manejar la autenticación  
- **Entorno**: Variables de entorno para proteger datos sensibles  

---

## ✨ Funcionalidades

### 👤 Autenticación
- Login con Google para cualquier usuario.  
- Solo **dos administradores** (definidos en Firestore) pueden acceder al panel de administración.  
- Se protegieron credenciales y datos sensibles mediante variables de entorno.  
- Context API para manejar el estado de autenticación.  

### 📂 Categorías
- Vista con lista de jugadores y su respectiva categoría.  
- Funcionalidad de **buscador** por nombre o categoría.  

### 🎾 Torneos
- Vista de torneos disponibles (próximos a jugarse).  
- **Usuarios**: pueden ingresar al detalle de cada torneo.  
- **Administradores**: pueden **eliminar torneos**.  
- Vista de detalle `/torneo/:id` con:  
  - Cruces de la zona de enfrentamientos.  
  - Nombres de los jugadores.  
  - Horarios y día de los partidos.  

### ➕ Crear torneo
- Opción visible **solo para administradores**.  
- Permite crear un torneo estableciendo condiciones:  
  - Tipo de torneo.  
  - Día de juego.  
  - Categorías habilitadas.  
- Solo jugadores cuya categoría sea mayor o igual a la permitida podrán inscribirse.  

### 🎨 Estilos y experiencia de usuario
- La aplicación está pensada **exclusivamente para móviles**.  
- Se aplicaron estilos con CSS + Material UI, priorizando la experiencia mobile.  
- Aunque se pensó en formato “app”, se decidió mantenerla como **página web** para facilitar el acceso mediante un link, evitando instalaciones innecesarias.  

---

