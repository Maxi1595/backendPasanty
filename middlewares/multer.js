const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardan los PDFs
  },
  filename: function (req, file, cb) {
    const nombreArchivo = Date.now() + '-' + file.originalname;
    cb(null, nombreArchivo);
  }
});

// Filtro para permitir solo PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
