const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');
const multer = require('multer');


router.post('/upload', validateToken, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error uploading files' });
        }
        // Files are uploaded successfully
        console.log(req.files);
        res.json({ message: 'Files uploaded successfully',filename:req.files });
    });
});


module.exports = router;