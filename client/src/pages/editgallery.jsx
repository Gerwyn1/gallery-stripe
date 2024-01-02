import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Radio, Input, IconButton } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom';
import http from "../http"
import { Carousel } from 'react-bootstrap'
import HouseIcon from '@mui/icons-material/House';
import DescriptionIcon from '@mui/icons-material/Description';

function editgallery() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [room, setRoom] = useState([])

    useEffect(() => {
        http.get(`/gallery?userid=${id}`).then((data) => {
            setName(data.data[0].name)
            console.log(data)
        })
    }, [])
    useEffect(() => {
        http.get(`/room/${id}`).then((data) => {
            console.log(data)
            if (data.data == null || data.data.length === 0) {
                return;
            }
        
            // Assuming data.data is an array of objects
            // Perform any operations you need on each item
            for (let i=0;i<data.data.length;i++){
                console.log(data.data[0])
            }
            setRoom(data.data);

        })
    }, [])

    const add = () => {
        navigate(`/addroom/${id}`)
    }
    return (
        <div style={{ width: "50%", margin: "auto" }}>
            <div style={{ marginTop: "5%", background: "white", height: "5dvw" }}>
                <div style={{ margin: "auto" }}>
                    <   Typography style={{ textAlign: "center", color: 'black', fontSize: "3rem" }}>Gallery: {name}<Button onClick={add} style={{ fontSize: "2rem", marginLeft: "2%", background: "green", color: "black" }}>Add Room</Button></Typography>
                </div>
                <Grid container spacing={2} style={{ marginTop: "5%", marginBottom: "5%" }}>
                    {
                        room.map((room, i) => {
                            return (
                                <Grid item xs={12} md={6} lg={4} key={room._id}>
                                    <div style={{ backgroundColor: "#ebebef", borderRadius: "7%", marginBottom: "5%", height: "65rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Card style={{

                                            boxShadow: "none",
                                            width: "75%",
                                            height: "90%",
                                            background: "transparent",


                                        }}>
                                            {
                                                room.images && (
                                                    <Carousel data-bs-theme="dark" nextLabel="" prevLabel="">
                                                        {room.images.map((image, index) => (
                                                            <Carousel.Item key={index}>
                                                                <img
                                                                    className="d-block w-100"
                                                                    src={`${import.meta.env.VITE_FILE_BASE_URL}${image}`}
                                                                    style={{ height: "10dvw" }}
                                                                    alt={`Slide ${index + 1}`}
                                                                />
                                                            </Carousel.Item>
                                                        ))}
                                                    </Carousel>
                                                )
                                            }
                                            <div style={{ height: "15vh" }}>
                                                <CardContent style={{ margin: "auto" }}>

                                                    <Box sx={{}}
                                                        color="text.secondary">
                                                        <Typography style={{ fontWeight: "bold", textAlign: "center", color: "black", fontSize: "2rem" }}>
                                                            {<div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <HouseIcon style={{ marginRight: 8, fontSize: "36px" }} />
                                                                Name: {room.name}
                                                            </div>}
                                                        </Typography>
                                                    </Box>


                                                </CardContent>

                                                <CardContent style={{ margin: "auto" }}>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                                        color="text.secondary">
                                                        <Typography style={{ fontWeight: "bold", textAlign: "center", color: "black", fontSize: "2rem" }}>
                                                            {<div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <DescriptionIcon style={{ marginRight: 8, fontSize: "36px" }} />
                                                                Description: {room.desc}
                                                            </div>}
                                                        </Typography>
                                                    </Box>


                                                </CardContent>


                                            </div>


                                        </Card>
                                    </div>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </div>
        </div>
    )
}

export default editgallery