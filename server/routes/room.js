const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Room = require("../models/room");
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
const mongodb = require("mongodb")
const ObjectId = mongodb.ObjectId;
require('dotenv').config();

router.post("/:id", async (req, res) => {
    let data = req.body;
    
    let id = req.params.id
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(50).required(),
        desc:yup.string().trim().min(8).max(400).required(),
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.name = data.name.trim();
    data.desc = data.desc.trim();
    console.log(id)

    let result = new Room(data.name,data.desc,data.imageFile,id)
    result.save()
    res.json(result);
})
router.get("/:id",async (req,res)=>{
    const id = req.params.id
    console.log("theid",id)
    Room.findByArtId(id).then((data)=>{
        console.log("dataaa:", data);
        res.json(data)
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    
})

module.exports = router;
