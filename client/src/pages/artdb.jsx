import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, Button, Grid, Card, CardContent, Radio, Input, IconButton } from '@mui/material'
import { Carousel } from 'react-bootstrap'
import http from '../http';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {  useNavigate } from 'react-router-dom';

function artdb() {
  const navigate = useNavigate();

  const [gallery, setGallery] = useState([])
  const getGallery = () => {
    http.get('/gallery').then((res) => {
      setGallery(res.data);
    });

  };
  useEffect(() => {
    getGallery();
  }, []);
  const edit = (id) =>{
    navigate(`/editgallery/${id}`)
  }
  return (
    <Grid container spacing={2} style={{ marginTop: "5%", marginBottom: "5%" }}>
        {
          gallery.map((gallery, i) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={gallery._id}>
                <div style={{ backgroundColor: "#ebebef", borderRadius: "7%", marginBottom: "5%", height: "65rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Card style={{

                    boxShadow: "none",
                    width: "75%",
                    height: "90%",
                    background: "transparent",


                  }}>
                    {
                      gallery.images && (
                        <Carousel data-bs-theme="dark" nextLabel="" prevLabel="">
                          {gallery.images.map((image, index) => (
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
                              <PersonIcon style={{ marginRight: 8, fontSize: "36px" }} />
                              Name: {gallery.name}
                            </div>}
                          </Typography>
                        </Box>


                      </CardContent>
                      <CardContent style={{ margin: "auto" }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                          color="text.secondary">
                          <Typography style={{ fontWeight: "bold", textAlign: "center", color: "black", fontSize: "2rem" }}>
                            {<div style={{ display: 'flex', alignItems: 'center' }}>
                              <HouseIcon style={{ marginRight: 8, fontSize: "36px" }} />
                              Room: {gallery.rooms}
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
                              Description: {gallery.desc}
                            </div>}
                          </Typography>
                        </Box>


                      </CardContent>
                      <CardContent style={{ margin: "auto" }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                          color="text.secondary">
                          <Typography style={{ fontWeight: "bold", textAlign: "center", color: "black", fontSize: "2rem" }}>
                            {<div style={{ display: 'flex', alignItems: 'center' }}>
                              <AttachMoneyIcon style={{ marginRight: 8, fontSize: "36px" }} />
                              Price: ${gallery.price}
                            </div>}
                          </Typography>
                        </Box>


                      </CardContent>
                      <CardContent style={{ margin: "auto" }}>
                        <Button fullWidth variant="contained" sx={{ mt: 2 }}
                          style={{ marginBottom: "20%", backgroundColor: "red", padding: "15px", fontWeight: "bold" }}
                          onClick={() => edit(gallery._id)} id={gallery._id}>
                          Edit
                        </Button>
                      </CardContent>
                    </div>


                  </Card>
                </div>
              </Grid>
            );
          })
        }
      </Grid>
  )
}

export default artdb