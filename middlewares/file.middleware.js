const multer = require('multer');
const path = require('path');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../temp/uploads'))
    },
});

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        cb(new Error('Invalid file type'));
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            const filePath = req.file.path;
            const image = await cloudinary.uploader.upload(filePath);

            await fs.unlinkSync(filePath);
            
            req.file_url = image.secure_url;
            return next();
        } catch(error) {
            return next(error) 
        }
    }
};

module.exports = { upload: upload, uploadToCloudinary };