import React, { useContext, useState, useEffect,useMemo } from "react";
import { Box, Typography, TextField, Button, Input } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "react-icons-kit";

import { edit2 } from "react-icons-kit/feather/edit2";
import http from "../http";
import dashboard from "./dashboard.module.css";
import { lock } from "react-icons-kit/feather/lock";
import Select from 'react-select'
import countryList from 'react-select-country-list'
function userDetails() {
  const [user, setUser] = useState(null);
  const [imageFile, setImageFile] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }
  //readonly section
  const [disabled, setDisabled] = useState(true);
  // update background colour
  const [backgroundColor, setBackgroundColor] = useState('#61677A');
  const editor = () => {
    if (disabled === true) {
      setDisabled(false);
      setBackgroundColor("blueviolet");
      setIsButtonDisabled(false); 
    }
    else {
      setDisabled(true);
      setBackgroundColor("#61677A")
      setIsButtonDisabled(true); 
    }
  };
  const cancel = () => {
    setDisabled(true);
    setBackgroundColor("#61677A")
    setIsButtonDisabled(true); 
    console.log("Disabled")

  }
  // reload page(cancel button)
  const reload = () => {
    formik.setFieldValue("name", userDetail.name);
    formik.setFieldValue("phone", userDetail.phone);
    formik.setFieldValue("email", userDetail.email);
    formik.setFieldValue("country", userDetail.country);
    formik.setFieldValue("postal", userDetail.postal);
    formik.setFieldValue("address", userDetail.address);
  };
  const [userDetail, setuserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    createdAt: "",
    country:"",
    postal:"",
    address:"",
    _id:""
  });
  
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http
        .get("/user/auth")
        .then((res) => {
          setUser(res.data.userid);
          console.log(res.data.userid); // Verify the user value here
          return res.data.userid;
        })
        .then((user) => {
          console.log(user,"user") // id
          fetch(`http://localhost:3001/user/userdetails/${user}`, {
            method: "GET",
          })
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
              setuserDetail(data);
              
              console.log("data",data);
            });
        });
        
    }
    
  }, []);
  

  const formik = useFormik({
    initialValues: userDetail,
    enableReinitialize: true,
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
      postal: yup
      .string()
      .trim()
      .min(1, "Postal must be more than 1 characters"),
      address: yup
      .string()
      .trim()
      .min(1, "Address must be more than 1 characters"),
      
    }),

    onSubmit: (data) => {
      data.name = data.name.trim();
      data.email = data.email.trim();
      data.phone = data.phone.trim();
      data.country = data.country
      data.postal = data.postal.trim();
      data.address = data.address.trim();
      console.log(data,"data")
      fetch(`http://localhost:3001/user/userdetails/${userDetail._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        // http
        //   .put(`/user/userdetails/${userDetail.id}`, data)
        .then((res) => {
          editor()
          console.log(res.data);
          toast.success(res.data)
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
    },
  });
  return (
    <div className={dashboard.purpleContainer}>
      <div className={dashboard.whiteContainer}>
        <div className={dashboard.header} style={{ fontFamily: "Montserrat",color:"black" }}>
          User Details
        </div>

        <div className={dashboard.form}>
          <Box component="form" onSubmit={formik.handleSubmit}>
           
            
            

            <label
              for="name"
              style={{ fontSize: "10px", fontFamily: "Montserrat",color:"black" }}
            >
              Name
            </label>

            <br />
            <div className={dashboard.textwrap} style={{ background: backgroundColor }}>
              <input
                style={{ color: "white", background: backgroundColor }}
                className={dashboard.name}
                margin="normal"
                autoComplete="off"
                label="Name"
                name="name"
                placeholder="name"
                value={userDetail.name && formik.values.name}
                onChange={formik.handleChange}
                disabled={disabled}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className={dashboard.errorText} color="red">
                {formik.errors.name}
              </div>
            )}

            <label
              for="email"
              style={{ fontSize: "10px", fontFamily: "Montserrat" ,color:"black"}}
            >
              Email
            </label>

            <div className={dashboard.textwrap} style={{ background: backgroundColor }}>
              <input
                style={{ color: "white", background: backgroundColor }}
                className={dashboard.email}
                margin="normal"
                autoComplete="off"
                label="Email"
                name="email"
                placeholder="email"
                value={userDetail.email && formik.values.email}
                onChange={formik.handleChange}
                disabled={disabled}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className={dashboard.errorText} color="red">
                {formik.errors.email}
              </div>
            )}

            <div className={dashboard.dobandphone}>
              <div style={{ width: "47%" }}>
                <label
                  for="dob"
                  style={{ fontSize: "10px", fontFamily: "Montserrat",color:"black" }}
                >
                  Account Created on
                </label>
                <br />
                <div className={dashboard.textwrap} style={{ display: "flex", background: backgroundColor }}>
                  <input
                    style={{ color: "white", background: backgroundColor }}
                    className={dashboard.dob}
                    margin="normal"
                    autoComplete="off"
                    label="date"
                    name="date"
                    value="2023-06-23"
                    dateformat="YYYY-MM-DD"
                    onChange={formik.handleChange}
                    disabled
                  />
                  <Icon
                    icon={lock}
                    style={{ color: "white", margin: "auto" }}
                    className="lockicon"
                  ></Icon>
                </div>
              </div>
              <br />
              <div style={{ width: "47%" }}>
                <label
                  for="phone"
                  style={{ fontSize: "10px", fontFamily: "Montserrat" ,color:"black"}}
                >
                  Phone Number
                </label>
                <br />
                <div className={dashboard.textwrap} style={{ background: backgroundColor }}>
                  <input
                    style={{ color: "white", background: backgroundColor }}
                    className={dashboard.phone}
                    margin="normal"
                    autoComplete="off"
                    label="phone"
                    name="phone"
                    type="text"
                    placeholder="phone"
                    value={userDetail.phone && formik.values.phone}
                    onChange={formik.handleChange}
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div style={{ float: "right", width: "47%", marginTop: "-10px" }}>
              {formik.touched.phone && formik.errors.phone && (
                <div
                  className={dashboard.errorText}
                  color="red"
                  style={{
                    font: "Roboto",
                  }}
                >
                  {formik.errors.phone}
                </div>
              )}
            </div>
            <label
              for="country"
              style={{ fontSize: "10px", fontFamily: "Montserrat",color:"black" }}
            >
              Country
            </label>

            <br />
            <div className={dashboard.textwrap} >
              
              <Select label="country"options={options} value={userDetail.country && formik.values.country && value} 
              onChange={formik.handleChange} />
            </div>
            {formik.touched.country && formik.errors.country && (
              <div className={dashboard.errorText} color="red">
                {formik.errors.country}
              </div>
            )}
            <label
              for="Postal"
              style={{ fontSize: "10px", fontFamily: "Montserrat",color:"black" }}
            >
              Postal Code
            </label>

            <br />
            <div className={dashboard.textwrap} style={{ background: backgroundColor }}>
              <input
                style={{ color: "white", background: backgroundColor }}
                className={dashboard.postal}
                margin="normal"
                autoComplete="off"
                label="Postal"
                name="postal"
                placeholder="postal"
                value={userDetail.postal && formik.values.postal}
                onChange={formik.handleChange}
                disabled={disabled}
              />
            </div>
            {formik.touched.postal && formik.errors.postal && (
              <div className={dashboard.errorText} color="red">
                {formik.errors.postal}
              </div>
            )}
            <label
              for="address"
              style={{ fontSize: "10px", fontFamily: "Montserrat",color:"black" }}
            >
              Address
            </label>

            <br />
            <div className={dashboard.textwrap} style={{ background: backgroundColor }}>
              <input
                style={{ color: "white", background: backgroundColor }}
                className={dashboard.address}
                margin="normal"
                autoComplete="off"
                label="address"
                name="address"
                placeholder="address"
                value={userDetail.address && formik.values.address}
                onChange={formik.handleChange}
                disabled={disabled}
              />
            </div>
            {formik.touched.address && formik.errors.address && (
              <div className={dashboard.errorText} color="red">
                {formik.errors.address}
              </div>
            )}

            <Button className={dashboard.edit} onClick={editor}>
              Edit Details
              <Icon
                icon={edit2}
                style={{ paddingLeft: "10px", marginBottom: "5px" }}
              ></Icon>
            </Button>
            <br />
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button className={dashboard.save} type="submit" onClick={cancel} >
                Save
              </Button>
              <br />
              <Button className={dashboard.cancel} onClick={reload && cancel}>
                Cancel
              </Button>
            </Box>
      <ToastContainer />
          </Box>
        </div>
      </div>
    </div>
  );
}
export default userDetails;
