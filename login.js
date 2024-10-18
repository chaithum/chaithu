import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import config from "../config";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
 
const Login=()=>{
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
   
  });
  const [isLogin, setIsLogin] = useState(true);
 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  const sendRequest=async(type="login")=>{
    console.log("inside send req");
    console.log(`${config.BASE_URL}/api/users/${type}`);
    const res=await axios.post(`${config.BASE_URL}/api/users/${type}`,{
     
        email:inputs.email,
        password:inputs.password,
     
    })
    .catch((err)=>console.log(err));
    const data=await res.data
    console.log("return");
    console.log(data);
    return data
}
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isLogin) {
      sendRequest("login")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/home"));
       
    } else {
      // sendRequest("signup")
      //   .then((data) => localStorage.setItem("userId", data.user._id))
      //   .then(() => dispath(authActions.login()))
      //   .then(() => navigate("/login"));
        alert("wrong credentials")
    }
  }
  return (
    <MDBContainer className="mt-5">
      <MDBCard>
        <MDBCardBody>
          <h3 className="text-center mb-4">Login In</h3>
          <form  onSubmit={handleSubmit}>
             {/* Email Input */}
            <div className="mb-4">
              <MDBInput
               onChange={handleChange}
                label="Email address"
                id="email"
                type="email"
                className="form-control"
                style={{ backgroundColor: '#f0f8ff' }} // Light background
              />
            </div>
 
            {/* Password Input */}
            <div className="mb-4">
              <MDBInput
               onChange={handleChange}
                label="Password"
                id="password"
                type="password"
                className="form-control"
                style={{ backgroundColor: '#f0f8ff' }} // Light background
              />
            </div>
 
            {/* Checkbox */}
            <div className="mb-4" >
         
              {/* <MDBCheckbox
               onChange={handleChange}
                name="flexCheck"
                id="flexCheckDefault"
                label="Remember me"
                style={{ color: '#007bff' }} 
             /> */}
             <a href='forgetPassword'>Forgot password?  </a><br></br>
              Not a member? <a href='signup'>Register</a>
            </div>
 
            {/* Submit Button */}
            <MDBBtn color="primary" type="submit" block onClick={() => setIsLogin(!isLogin)}>
          Login
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
export default Login;