import React from "react";
import {Link,useNavigate} from "react-router-dom";
import { useState,useContext} from "react";
import showPwdImg from './show-password.svg';
import hidePwdImg from './hide-password.svg';
import './signin.css';
import { userContext } from "../../App";

const SignIn=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [useInfo,setUseInfo] = useContext(userContext);
    const navigate = useNavigate();
    

    const handleSubmit=async (e)=>{
      if(!(email,password)){
       return alert("All input is required")
      }
      e.preventDefault();
      console.log(email,password);
      const data = await (await fetch('https://propsaleback.herokuapp.com/',{
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
      })).json();
      console.log(data);
      if(data.error==="Invalid password"){
        return alert("Invalid password");
      }
      if(data.error==="User Not found"){
        return alert("User does not exist")
      }
      if(data.status === "ok"){
        setUseInfo({
          userId : data.user.userId,
          userName : email.split("@")[0],
          accessToken : data.token
        });
        console.log(useInfo);
        alert("login successfull");
        navigate("/display");
      }
    }
    
    
    return(
    <>
    <div className="login-page">
      <div className="form">
        <div className="login">
          <div className="login-header">
            <h3>Logo</h3>
            <p className="enter">Enter your credentials to access your account</p>
          </div>
        </div>
        <form className="login-form">
          <input type="email" placeholder="User ID" onChange={e=>setEmail(e.target.value)} />
          <input type={isRevealPwd?"text":"password"} placeholder="Password" onChange={e=>setPassword(e.target.value)} />
          <img className="showhide" alt="eye"
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
          <button onClick={handleSubmit} >Sign In</button>
          <p className="message"><Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
      <p className="dont">Don't have an account ? <span className="message"><Link to="/signup">Sign Up</Link></span></p>
    </div>
    </>
    )
}

export default SignIn;