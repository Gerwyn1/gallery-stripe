import { React, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registers from "./Register.module.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import AspectRatio from '@mui/joy/AspectRatio';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import login from "./images/login.jpeg"
function Register() {
  const navigate = useNavigate();
  const [type1, setType1] = useState("password");
  const [icon1, setIcon1] = useState(eyeOff);

  //first eye
  const passToggle = () => {
    if (type1 === "password") {
      setIcon1(eye);
      setType1("text");
    } else {
      setIcon1(eyeOff);
      setType1("password");
    }
  };
  const [type2, setType2] = useState("password");
  const [icon2, setIcon2] = useState(eyeOff);
  //second eye
  const passToggle1 = () => {
    if (type2 === "password") {
      setIcon2(eye);
      setType2("text");
    } else {
      setIcon2(eyeOff);
      setType2("password");
    }
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .trim()
        .matches(/^[a-z ,.'-]+$/i, "Invalid name")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required"),
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      phone: yup
        .string()
        .trim()
        .min(8, "Phone number must be 8 characters")
        .max(8, "Phone number must be 8 characters")
        .required("Phone Number is required"),
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .trim()
        .required("Confirm password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (data) => {
      data.name = data.name.trim();
      data.email = data.email.trim().toLowerCase();
      data.phone = data.phone.trim();
      data.password = data.password.trim();
      data.admin = false;
      console.log(data)
      // data.userId = data.id;
      http
        .post("/user/register", data)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('userData', JSON.stringify(data));
          navigate("/verification")
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });


    },
  });

  return (
    <div style={{ width: "55%", margin: "auto" }}>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "10%" }}>
        <div style={{ width: "100%" }}>
          <img src={login} alt="" style={{ width: "100%" }} />
        </div>

        <Box component="form" onSubmit={formik.handleSubmit} style={{ background: "white", width: "100%", padding: "5%" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Register
          </Typography>
            <TextField
              fullWidth margin="dense" autoComplete="off"
              label={<div style={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon style={{ marginRight: 8 }} />
                Name
              </div>}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth margin="dense" autoComplete="off"
              label={<div style={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon style={{ marginRight: 8 }} />
                Email
              </div>}
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
                name="password" type={type1}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <span
                className="eyespan"
                style={{ display: "inline-block", margin: "auto", position: "absolute", left: "23dvw", top: "33%" }}
              >
                <Icon
                  icon={icon1}
                  onClick={passToggle}
                  style={{
                    display: "inline-block",
                    color: "black",
                    cursor: "pointer",
                  }}
                />

              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", position: "relative", width: "25dvw" }}>
              <TextField

                fullWidth margin="dense" autoComplete="off"
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LockIcon style={{ marginRight: 8 }} />
                    Confirm Password
                  </div>
                }
                name="confirmPassword" type={type2}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              <span
                className="eyespan"
                style={{ display: "inline-block", margin: "auto", position: "absolute", left: "23dvw", top: "33%" }}
              >
                <Icon
                  icon={icon2}
                  onClick={passToggle1}
                  style={{
                    display: "inline-block",
                    color: "black",
                    cursor: "pointer",
                  }}
                />

              </span>
            </div>
            <TextField
              fullWidth margin="dense" autoComplete="off"
              label={<div style={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon style={{ marginRight: 8 }} />
                Phone
              </div>}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
            />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} style={{ background: "#E8533F" }}
              type="submit">
              Register
            </Button>
        </Box>

      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
