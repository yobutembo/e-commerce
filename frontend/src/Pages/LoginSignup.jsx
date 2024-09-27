import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("login function executed", formData)
    try{
      const response = await fetch('http://localhost:4000/login',{
        method: 'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      })
      const responseData = await response.json()
  
      if (responseData.success){
        localStorage.setItem('auth-token', responseData.token)
        window.location.replace('/')
      }else{
        alert(responseData.errors)
      }
    }catch(error){
      console.error("Error during login", error)
    }

  }
  const signup = async () => {
    console.log("signup function executed", formData)
  try{
    const response = await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    })
    const responseData = await response.json()

    if (responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    }else{
      alert(responseData.errors)
    }
  }catch(error){
    console.error("Error during signup", error)
  }
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Name" />}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder="Email Address" />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state === "Login" ? (
          <p className="loginsignup-login">
            Don't have an account?<span onClick={()=>{setState("Sign Up")}}> Sign Up</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?<span onClick={()=>{setState("Login")}}> Login</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
