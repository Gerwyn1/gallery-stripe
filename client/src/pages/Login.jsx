import logins from "./Login.module.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Input, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";
import login from "./images/login.jpeg"
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
function Login() {


  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState(false)
  //remember me
  // const [rememberMe, setRememberMe] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("")


  // useEffect(()=>{
  //   const storedEmail = Cookies.get('rememberedEmail');
  //   const storedPassword = Cookies.get('rememberedPassword');

  //   if (storedEmail && storedPassword) {
  //     setEmail(storedEmail);
  //     setPassword(storedPassword);
  //     setRememberMe(true);
  //   }

  // },[])
  // const handleLogin = () => {

  //   if (rememberMe) {
  //     // Set cookies to expire in 30 days
  //     console.log("here")
  //     Cookies.set('rememberedEmail', email, { expires: 30 });
  //     Cookies.set('rememberedPassword', password, { expires: 30 });
  //   } else {
  //     // Remove cookies if "Remember Me" is not checked
  //     Cookies.remove('rememberedEmail');
  //     Cookies.remove('rememberedPassword');
  //   }
  // }
  const onSuccess = (res) => {
    console.log("Success,Current user: ", res.ProfileObj);
  };

  const passToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const handleClose = () => {
    setOpen(false);
    setPass(false)
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const formikemail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
    }),
    onSubmit: (data) => {
      data.email = data.email.trim().toLowerCase();
      console.log(data)
      http
        .get(`/user/findemail?email=${data.email}`)
        .then((res) => {
          // handleLogin()
          setEmail(res.data.id)
          setPass(true)
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
    },
  })
  

  const formik = useFormik({
    // initialValues: 
    //   // email: email,
    //   // password: password
    // ,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
    }),
    onSubmit: (data) => {
      data.email = data.email.trim().toLowerCase();
      data.password = data.password.trim();
      console.log(data)
      http
        .post("/user/login", data)
        .then((res) => {
          // handleLogin()
          localStorage.setItem("accessToken", res.data.accessToken);
          setUser(res.data.user);
          navigate("/");
          window.location.reload();

        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "10%" }}>
        <div style={{ width: "100%" }}>
          <img src={login} alt="" style={{ width: "100%" }} />
        </div>

        <Box component="form" onSubmit={formik.handleSubmit} style={{ background: "white", width: "100%", padding: "5%" }}>
          <Typography variant="h5" sx={{ my: 2 }} style={{ fontSize: "3rem" }} >
            Login
          </Typography>
          <TextField style={{ width: "25dvw" }}
            fullWidth margin="dense" autoComplete="off"
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon style={{ marginRight: 8 }} />
                Email
              </div>
            }
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <div style={{ display: "flex", flexDirection: "row", position: "relative", width: "25dvw" }}>
            <TextField

              fullWidth margin="dense" autoComplete="off"
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LockIcon style={{ marginRight: 8 }} />
                  Password
                </div>
              }
              name="password" type={type}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <span
              className="eyespan"
              style={{ display: "inline-block", margin: "auto", position: "absolute", left: "23dvw", top: "25%" }}
            >
              <Icon
                icon={icon}
                onClick={passToggle}
                style={{
                  display: "inline-block",
                  color: "black",
                  cursor: "pointer",
                }}
              />

            </span>
          </div>
          <Button fullWidth variant="contained" sx={{ mt: 2 }}
            type="submit" style={{ background: "#E8533F" }}>
            Login
          </Button>
        </Box>

      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
