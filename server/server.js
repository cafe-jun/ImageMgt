'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const imageRouter = require('./routers/ImageRouter');
const app = express();

app.use('/uploads', express.static('uploads'));

const { PORT, MONGO_URL } = process.env;
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB Connect Success ');
        app.use('/images', imageRouter);
        app.listen(PORT, () => {
            console.log(`Listening Express Server Port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
