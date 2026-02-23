const pingServer = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Servidor activo'
    });

};

module.exports = {
    pingServer
};