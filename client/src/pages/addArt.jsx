import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';

import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function addArt() {
    const [imageFile, setImageFile] = useState([]);


    const onImageFileChange = (e) => {
        let files = e.target.files;
        if (files.length > 0) {
            // let newImageFiles = [...imageFile ];

            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                if (file.size > 1024 * 1024) {
                    toast.error('Maximum file size is 1MB');
                    return;
                }

                let formData = new FormData();
                formData.append('file', file);
                //   formData.forEach((value, key) => {
                //     console.log(key, value);
                // });            
                http.post('/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((res) => {
                        // for (let i = 0 ; i<res.data.filename.length;i++){
                        //   console.log("filename",res.data.filename[i].filename)
                        //   newImageFiles.push(res.data.filename[i].filename);
                        // }
                        const newImageFiles = res.data.filename.map(file => file.filename);
                        setImageFile(prevImageFile => [...prevImageFile, ...newImageFiles]);
                    })
                    .catch(function (error) {
                        console.log(error.response);
                    });
            }
        }
    };

    // useEffect(() => {
    //   console.log('Component re-rendered with new imageFile:', imageFile,imageFile.length);
    //   for (let i = 0; i < imageFile.length; i++) {
    //     setImageFile(imageFile)
    //   }
    // }, [imageFile]);


    const formik = useFormik({
        // initialValues: 
        //   // email: email,
        //   // password: password
        // ,
        initialValues: {
            artist: "",
            desc: "",
        },
        validationSchema: yup.object().shape({

            artist: yup
                .string()
                .trim()
                .min(3, "Name must be at least 8 characters")
                .max(50, "Name must be at most 50 characters")
                .required("Name is required"),
            desc: yup
                .string()
                .trim()
                .min(8, "description must be at least 8 characters")
                .max(400, "description must be at most 50 characters")
                .required("description is required"),

        }),
        onSubmit: (data) => {
            if (imageFile) {
                data.imageFile = imageFile;
            }
            data.artist = data.artist.trim();
            data.desc = data.desc.trim();
            http
                .post("/artwork", data)
                .then((res) => {
                    // handleLogin()
                    console.log(res.data);
                    toast("Successfully added gallery")

                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        },
    });
    return (
        <Box style={{ marginTop: "5%" }}>
            <div style={{ background: "white", height: "auto", width: "50dvw ", borderRadius: "7px", margin: "auto" }}>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: '500px' }} style={{ margin: "auto" }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={8}>
                            <TextField

                                style={{ width: "100%", margin: "auto" }}
                                fullWidth margin="dense" autoComplete="off"
                                label="Artist Name"
                                name="artist"
                                value={formik.values.artist}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.artist && Boolean(formik.errors.artist)}
                                helperText={formik.touched.artist && formik.errors.artist}
                            />

                            <TextField

                                fullWidth margin="dense" autoComplete="off"
                                label="Description"
                                name="desc"
                                value={formik.values.desc}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.desc && Boolean(formik.errors.desc)}
                                helperText={formik.touched.desc && formik.errors.desc}
                            />

                            <Grid item xs={12} md={6} lg={4}>
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Button variant="contained" component="label">
                                        Upload Images
                                        <input
                                            hidden
                                            accept="image/*"
                                            multiple
                                            type="file"
                                            onChange={onImageFileChange}
                                        />
                                    </Button>
                                    {imageFile && (
                                        <div>
                                            {imageFile.map((file, index) => (
                                                <AspectRatio key={index} sx={{ mt: 2 }}>
                                                    <Box component="img" src={`${import.meta.env.VITE_FILE_BASE_URL}${file}`} />
                                                </AspectRatio>
                                            ))}
                                        </div>
                                    )}
                                </Box>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                <Button variant="contained" type="submit">
                                    Add
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </div>
            <ToastContainer />
        </Box>
    )
}

export default addArt