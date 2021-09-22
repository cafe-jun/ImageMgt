const mimeType = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, `${uuidv4()}.${mimeType.extension(file.mimetype)}`),
});
const uploads = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true);
        else cb(new Error('invalidate FIle Extension'), false);
    },
    limits: {
        fileSize: 1024 * 1024 * 50,
    },
});

module.exports = { uploads };
