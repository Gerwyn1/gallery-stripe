const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser')
require('dotenv').config();
const mongoConnect = require('./models/database').mongoConnect;

const app = express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));


// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});
//Models (testing purposes)
const usermodel = require("./models/art")
app.use("/usermodel",usermodel)


// Routes

const userRoute = require('./routes/user');
app.use("/user", userRoute);
const fileRoute = require('./routes/file');
app.use("/file", fileRoute);
const authRoute = require('./routes/auth');
app.use("/auth", authRoute);
const gallery = require('./routes/gallery');
app.use("/gallery", gallery);
const payment = require('./routes/payment');
app.use("/payment", payment);
const room = require('./routes/room');
app.use("/room", room);
const artwork = require('./routes/artwork');
app.use("/artwork", artwork);


let port = process.env.APP_PORT;

mongoConnect(() =>{
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    })
})