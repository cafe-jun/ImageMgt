const { Router } = require('express');
const imageRouter = Router();
const Image = require('../models/Image');
const { uploads } = require('../middlewares/ImageUpload');

imageRouter.get('/', async (req, res, next) => {
    try {
        const images = await Image.find();
        return res.status(200).json(images);
    } catch (err) {
        console.error(err);
    }
});
imageRouter.post('/', uploads.single('image'), async (req, res) => {
    await new Image({
        key: req.file.filename,
        originFilename: req.file.originalname,
    }).save();
    res.json(req.file);
});

module.exports = imageRouter;
