const express = require('express');
const cors = require('cors');
const app = express();
const jugadoresRoutes = require('./routes/jugadores');
const parejasRoutes = require('./routes/parejas');
const torneosRoutes = require('./routes/torneos');
const zonasRoutes = require('./routes/zonas');
const parejasZonasRoutes = require('./routes/parejas_zonas');

app.use(cors());

app.use(express.json());  // Para recibir datos en formato JSON
app.use('/api', jugadoresRoutes);
app.use('/api', parejasRoutes);
app.use('/api', parejasZonasRoutes);
app.use('/api', torneosRoutes);
app.use('/api', zonasRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
