const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista en la raíz
    },
    filename: function (req, file, cb) {
        // Nombre único para evitar conflictos
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;