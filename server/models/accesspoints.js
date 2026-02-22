const mongoose = require('mongoose');

const APSchema = new mongoose.Schema({
    model: { type: String, required: true },
    category: String,
    technology: String,
    antennas: String,
    bands: [String],
    channels: [Number],
    clients: Number,
    coverage: Number,
    
    ports: [String], // Array de puertos
    
        // Campos para PSE
    psePorts: { type: Number, default: 0 }, // Cantidad de puertos que entregan energía
    psePower: { type: String, default: "0W" }, // Total Watts disponibles (ej: "6W")
    
    throughput: String,
    imageUrl: String,
    description: String,
    datasheet: String
});

module.exports = mongoose.model('AccessPoint', APSchema);