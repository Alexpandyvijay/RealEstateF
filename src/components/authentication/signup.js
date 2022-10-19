import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import './signup.css'
import { useNavigate } from "react-router-dom";

const SignUp=()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const handleSubmit=(e)=>{
      if(!(email,password,confirmPassword)){
        return alert("All input is required")
       }
      e.preventDefault()
      if(!(email.includes("@"))){
        return alert("Invalid email format")
      }
      if(password.length<8){
        return alert("Password should contain atleast 8 characters")
      }
      if(password!==confirmPassword){
        alert("Password does not match!")
        return
      }
      fetch('https://propsaleback.herokuapp.com/signup',{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json","Access-Control-Origin":"*"
        },
        body:JSON.stringify({
          email,
          password
        })
      }).then((res)=>res.json())
      .then((data)=>{
        if(data.status==="User already exists"){
          alert("User already exists")
        }else{
          console.log(data)
          navigate("/")
        }
      }) 
    }
    return(
    <>
    <div className="login-page">
      <div className="form">
        <div className="login">
          <div className="login-header">
            <h3>Logo</h3>
            <p className="enter">Create New Account</p>
          </div>
        </div>
        <form className="login-form">
          <input type="email" placeholder="Mail ID" onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" onChange={e=>setConfirmPassword(e.target.value)} />
          <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
      <p className="message"><Link to="/login">Sign In</Link></p>
    </div>
    </>
    )
}

export default SignUp;