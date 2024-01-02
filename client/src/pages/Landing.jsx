import { Box, Typography, Button, Grid, Card, CardContent, Radio, Input, IconButton } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import picture from "./images/SAAM-banners.webp"
import { Carousel } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import AspectRatio from '@mui/joy/AspectRatio';
import http from '../http';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
function Landing() {
  const navigate = useNavigate();

  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const[loggedin,setloggedin] = useState(true)
  const [gallery, setGallery] = useState([])



  const clicked = () => {
    navigate("/register")

  }
  const handleRadioChange = (id) => {
    setSelectedGalleryId(id);
  }

  const getGallery = () => {
    http.get('/gallery').then((res) => {
      setGallery(res.data);
        console(res.data)
    });
  };

  //   //stripe
  //   useEffect(()=>{
  //     if(!stripe){
  //       return
  //     }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   )
  //   if (!clientSecret){
  //     return;
  //   }
  //   stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent})=>{
  //     switch (paymentIntent.status){
  //       case "succeeded":
  //         setMessage("Payment Succeeded!")
  //         break;
  //         case "processing":
  //           setMessage("Payment Succeeded")
  //           break;
  //           case "requires_payment_method":
  //             setMessage("Your payment was not successful, please try again.");
  //           default:
  //             setMessage("Something went wrong.");
  //             break;
  //     }

  //   })
  // },[stripe])
  // const handleSubmit = async (e,secret) =>{
  //   e.preventDefault()
  //   if(!stripe || !elements){
  //     return
  //   }
  //   setIsLoading(true);
  //   const {client_secret: clientSecret} = secret
  //   const {error} = await stripe.confirmPayment({
  //     elements,
  //     clientSecret,
  //     confirmParams:{
  //       return_url:"http://localhost:3000/success"
  //     }
  //   })

  //   if (error.type ==="card_error" || error.type ==="validation_error") {
  //     // This point will only be reached if there is an immediate error when
  //     // confirming the payment. Show error to your customer (for example, payment
  //     // details incomplete)
  //     setMessage(error.message);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //     setMessage("An unexpected error occured")
  //   }
  //   setIsLoading(false)
  // }


  const buy = (id) => {
    if (loggedin == false){
      navigate("/login")
    }
    else{
    http.get(`/gallery?userid=${id}`).then((res) => {
      let results = res.data[0].price
      localStorage.setItem("price", results)
      navigate("/payment")
        .catch((err) => {
          console.log(err)
        })
    })
  }


    // http.put(`/candidate/vote?userid=${user.id}`,selectedCandidateId).then((res)=>{
    //     console.log("Success")
    //     toast("Successfully voted for candidate")
    // })
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (localStorage.getItem("accessToken")) {
          pass
        }
        else{
          setloggedin(false)
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    getGallery();
  }, []);
  return (
    <Box style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: '30dvw', overflow: 'hidden' }}>
        <img src={picture} alt="" style={{ width: '100%', height: '30dvw', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30dvw', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: '80%', left: '90%', zIndex: 2, color: '#fff', textAlign: 'center', margin: '-15dvw 0 0 -50%' }}>
          <h1>Your Text Here</h1>
          <Button onClick={clicked} style={{ marginTop: "5%", padding: "5%", width: "15dvw", height: "auto", fontSize: "20px", background: 'green', border: "none", color: "black" }}>Register</Button>
        </div>
      </div>


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
                          onClick={() => buy(gallery._id)} id={gallery._id}>
                          Buy
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
    </Box>

  )
}

export default Landing