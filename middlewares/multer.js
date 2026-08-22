const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary'); // el archivo que ya creaste

// Storage para CVs (PDF)
const storagePDF = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'pasanty/cvs',
        resource_type: 'auto',  // necesario para PDFs
        allowed_formats: ['pdf'],
    }
});

// Storage para imágenes de perfil
const storageImagen = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'pasanty/fotos',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    }
});

const uploadCV = multer({ storage: storagePDF });
const uploadImagen = multer({ storage: storageImagen });

module.exports = { uploadCV, uploadImagen };