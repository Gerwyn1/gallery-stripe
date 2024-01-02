import { useState,useEffect } from "react";
import { Container, AppBar, Toolbar, Modal } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//pages links
import "./Home.css";
import Arts from "./pages/arts";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Verification from "./pages/verification";
import Userdetails from "./pages/userdetails";
import Landing from "./pages/Landing";
import http from "./http"
import Artdb from "./pages/artdb"
import UserContext from "./contexts/UserContext";
import UserSideNavigation from "./UserSideNavigation";
import Payment from "./pages/payment";
import Editgallery from "./pages/editgallery";
import "bootstrap/dist/css/bootstrap.min.css";
import Addroom from "./pages/addroom";
import AddArt from "./pages/addArt";
function App() {
	const [user, setUser] = useState("profile");
	const [isAdmin, setIsAdmin] = useState(false);  // CHANGE IF NEED TO TEST
	const [userid, setUserid] = useState(null);
	const handleLinkClick = () => {
		setIsNavExpanded(false);
	  };
	  useEffect(() => {
		const getUser = () => {
		  fetch("http://localhost:3001/auth/login/success", {
			method: "GET",
			credentials: "include",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			  "Access-Control-Allow-Credentials": true,
			},
		  })
			.then((response) => {
			  if (response.status === 200) return response.json();
			  throw new Error("authentication has been failed!");
			})
			.then((resObject) => {
			  setUser(resObject.user);
			})
			.catch((err) => {
			  console.log(err);
			});
		};
		getUser();
	  }, []);
	
	  useEffect(() => {
		async function fetchData() {
		  try {
			if (localStorage.getItem("accessToken")) {
			  const authResponse = await http.get("/user/auth");
			  setUser(authResponse.data.user);
			  setUserid(authResponse.data.userid);
	
			  const userDetailsResponse = await http.get(`user/userdetails/${authResponse.data.userid}`);
				console.log( userDetailsResponse)
			  setIsAdmin(userDetailsResponse.data.admin === true);
			}
		  } catch (error) {
			console.error(error);
		  }
		}
	
		fetchData();
	  }, []);
  return (
	


<UserContext.Provider value={{ user, setUser }}>
      <Router>
        {isAdmin ? (
          // Render admin side navigation if the user is an admin
          <>
             <UserSideNavigation handleLinkClick={handleLinkClick} />
		  
			 
            <Container>
              <Routes>
				<Route path={"/"} element={<Landing/>} />
				<Route path={"/userdetails/:id"} element={<Userdetails />} />
				<Route path={"/Login"} element={<Login />} />
				<Route path={"/Register"} element={<Register />} />
				<Route path={"/Verification"} element={<Verification />} />
				<Route path = {"/arts"} element={<Arts/>}></Route>
				<Route path={"/artdb"} element={<Artdb/>} />
				<Route path={"/editgallery/:id"} element={<Editgallery/>} />
				<Route path={"/addroom/:id"} element={<Addroom/>} />
				<Route path={"/addart"} element={<AddArt/>} />

                {/* <Route path="/augmented" element={<Augmented />} /> */}

              </Routes>
            </Container>
          </>
        ) : (
          // Render user side navigation if the user is not an admin
          <>

            <UserSideNavigation handleLinkClick={handleLinkClick} />
            <Container>
              <Routes>
				<Route path={"/"} element={<Landing/>} />
				<Route path={"/userdetails/:id"} element={<Userdetails />} />
				<Route path={"/Login"} element={<Login />} />
				<Route path={"/Register"} element={<Register />} />
				<Route path={"/Verification"} element={<Verification />} />
				<Route path={"/payment"} element={<Payment />} />
				
                {/* <Route path="/augmented" element={<Augmented />} /> */}

              </Routes>
            </Container>
          </>
        )}
      </Router>
    </UserContext.Provider>
  );
}



export {App};
