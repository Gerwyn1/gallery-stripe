const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Artwork = require("../models/artwork");
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
const mongodb = require("mongodb")
const ObjectId = mongodb.ObjectId;
require('dotenv').config();

router.post("/", validateToken, async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        artist: yup.string().trim().min(3).max(50).required(),
        desc: yup.string().trim().min(8).max(400).required()
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }
    console.log(data)
    // Trim string values
    data.artist = data.artist.trim()
    data.desc = data.desc.trim();

    let result = new Artwork(data.artist,data.desc,data.imageFile)
    result.save()
    res.json(result);
})

module.exports = router