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

router.get('/arts', async (req, res) => {
    //to add data * test purposes

    // const newCar = new Car('Toyota', 'Some details', 20000, 30);
    // newCar.save()

    Art.fetchAll()
        .then((data) => {
            console.log("data:", data);
            res.json(data)
        })
        .catch((error) => {
            console.error("Error:", error);
        });



})

router.post("/register", async (req, res) => {
    let data = req.body;


    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required(),
        phone: yup.string().trim().min(8).max(8).required(),
        admin: yup.bool().required(),

    })
    //validation
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err,"err");
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.name = data.name.trim();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();
    data.phone = data.phone.trim();
    data.userid = data.id;

    // Check email
    // const user = await User.find({ email: data.email })
    // if (user) {
    //     res.status(400).json({ message: "Email already exists." });
    //     return;
    // }
    const user = await User.findByemail(data.email);

    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }

    const user_phone = await User.findByphone(data.phone);

    if (user_phone) {
        console.log("phonesss",user_phone)
        res.status(400).json({ message: "Phone number already exists." });
        return;
    }
    res.json(data)
})

router.post("/verification", async (req, res) => {
    let data = req.body;

    // Hash passowrd
    data.password = await bcrypt.hash(data.password, 10);
    // Create user
    const newUser = new User(data.name,data.email, data.password, data.phone);
    let result = newUser.save()

    res.json(result);
});

router.post("/login", async (req, res) => {

    // create demo admin account
    // const hashedPassword = await bcrypt.hash("123123123", 10);
    // console.log(hashedPassword)
    // let adminUser = new User("admin","admin@admin.com",hashedPassword,"88888888")
    // adminUser.createAdmin()
    // adminUser.save()

    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();

    // Check email and password
    let errorMsg = "Email or password is not correct.";
    let user = await User.findByemail(data.email);
    if (!user) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }

    // Return user info
    let userInfo = {
        id: user._id,
        email: user.email,
        name: user.name
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET,
        { expiresIn: '30d' });
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});
router.get("/userdetails/:id", async (req, res) => {
    let id = req.params.id;
    let userdetail = await User.findById(id)
    console.log(userdetail)
    res.json(userdetail)
})
router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        
    };
    res.json({
        user: userInfo,
        userid: req.user.id,
        useremail:req.user.email
    });
});

router.put("/userdetails/:id", async (req, res) => {
    let id = req.params.id;
    console.log("here")
    //1
    // Check id not found
    let details = await User.findById(id);
    if (!details) {
        res.sendStatus(404);
        return;
    }
    
    // Check request user id
    // let userId = req.user.id;
    if (details._id != id) {
        res.sendStatus(403);
        return;
    }

    let data = req.body;
    console.log(data,"data")
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        phone: yup.string().trim().min(8).max(8).required(),
        country: yup.string().trim().min(1).nullable(),
        postal: yup.string().trim().min(1),
        address: yup.string().trim().min(1)
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    //trim
    console.log(data.address,"address")
    data.name = data.name.trim();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();
    data.phone = data.phone.trim();
    data.country = data.country;
    data.postal = data.postal.trim();
    data.address = data.address.trim();
    //saving
    const user = new User(data.name,data.email, data.password, data.phone,new ObjectId(data._id))
    
    user.updatePostal(data.postal)
    user.updateCountry(data.country)
    user.updateAddress(data.address)
    let result= user.save()

    console.log("result:",result)
    res.json(result)
});
module.exports = router;
