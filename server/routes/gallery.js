const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Art = require("../models/art");
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
const mongodb = require("mongodb")
const ObjectId = mongodb.ObjectId;
require('dotenv').config();

router.post("/", validateToken, async (req, res) => {
let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(50).required(),
        desc:yup.string().trim().min(8).max(400).required(),
        room:yup.number().max(100).required(),
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
    console.log(data.price)
    
    let result = new Art(data.name,data.room,data.desc,data.imageFile,data.price)
    result.save()
    res.json(result);
});

router.get("/", async (req, res) => {
    // let condition = {};
    // let search = req.query.search;
    // if (search) {
    //     condition[Sequelize.Op.or] = [
    //         { name: { [Sequelize.Op.like]: `%${search}%` } },
    //     ];
    // }

    Art.fetchAll()
        .then((data) => {
            console.log("data:", data);
            res.json(data)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
router.get("/:id",async (req, res) => {
    const id = req.params.userid
    console.log(id)
    Art.findById(id).then((data)=>{
        console.log("data:", data);
            res.json(data)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    })


module.exports = router;
