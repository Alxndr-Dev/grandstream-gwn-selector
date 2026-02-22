const accessPoint = require('../models/accesspoints');

// Obtener todos los puntos de acceso
exports.getAPs = async (req, res) => {
    try {
        const accessPoints = await accessPoint.find();
        res.status(200).json(accessPoints);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los datos", error });
    }
};