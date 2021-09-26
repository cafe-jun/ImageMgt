const { Schema, model } = require('mongoose');

const ImageSchema = new Schema(
    {
        key: {
            type: String,
            required: true,
        },
        originFilename: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model('image', ImageSchema);
