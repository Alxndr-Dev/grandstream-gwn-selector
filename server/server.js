const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const accesspointsRoute = require('./routes/accesspoints.routes');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')


const app = express();

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

//Limitar peticiones
const limiter = rateLimit({
    windowsMs: 15*60*1000, // 15 minutos
    max: 120,
    message: "Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde."
});

app.use('/api', limiter);

// 2. Servir archivos estáticos
// Esto permitirá que al entrar a "/" busque automáticamente index.html en /client
app.use(express.static(path.join(__dirname, '..', 'client')));

// 3. Rutas de la API
app.use('/api/accesspoints', accesspointsRoute);

// 4. Conectar a la base de datos
connectDB();

// 5. Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`nodemonSirviendo cliente desde: ${path.join(__dirname, '..', 'client')}`);
});