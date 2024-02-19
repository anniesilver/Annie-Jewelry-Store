import React from "react";
import "./LoginModal.scss";
import { useState} from "react";
import {apiSignup,apiLogin} from "../Util/api";


export default function LoginModal({notifyParentRefresh}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSignup = (e) => {
      e.preventDefault();
  
      // Here send a POST request to signupUrl with username, name and password data
      const signUp = async () =>{
        try{
            const user = {
                email:e.target.email.value,             
                password:e.target.password.value,
                lastname:e.target.lastname.value, 
                firstname:e.target.firstname.value
            }
            console.log(user,"trying to sign up");
          //const response = await axios.post("http://localhost:8080/users/signup",user);
          const response = await apiSignup(user);
          if(response.success)
          {
            setIsLoggedIn(true);
          }
        }catch(e){
          console.error(e);
        }
      }
      signUp();
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Here send a POST request to loginUrl with username and password data
      const login = async () =>{
        try{
            const user={
                email:e.target.email.value, 
                password:e.target.password.value
            }
          //const response = await axios.post("http://localhost:8080/users/login",user);
          const response = await apiLogin(user);
          if(response.token)
          {
            setIsLoggedIn(true);
            sessionStorage.authToken = response.token;
            notifyParentRefresh(true);
          }
          else{
            setIsLoginError (true); 
            setErrorMessage(response.error);
          }
        }catch(e){
          console.error(e);
        }
      }
      login();
    };
    const handleCancel = (e) => {
        setIsLoggedIn(true);
    }
  
    const renderSignUp = () => (
        <div className="modal">
            <div className="modal__container">
                <h1>Sign Up</h1> 
                <form onSubmit={handleSignup}>
                    <div className="authform__input">
                        Username: <input type="Email" name="email" />
                    </div>
                    <div className="authform__input">
                        Password: <input type="password" name="password" />
                    </div>
                    <div className="authform__input">
                        Firstname: <input type="text" name="firstname" />
                    </div>
                    <div className="authform__input">
                        Lastname: <input type="text" name="lastname" />
                    </div>
                    <div className="authform__input">
                        <button type="submit" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
  
    const renderLogin = () => (
        <div className="modal">
            <div className="modal__container">
                <h1>Login</h1>                       
                {isLoginError && <label className="error">{errorMessage}</label>}
                <form onSubmit={handleLogin}>
                    <div className="authform">
                        Username: <input type="Email" name="email" />
                    </div>
                    <div className="authform">
                        Password: <input type="password" name="password" />
                    </div>
                    <div className="authform__op">
                        <button type="submit" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit">
                            Login
                        </button>
                    </div>
                    <label onClick={handleSignup}> Sign Up </label>
                </form>
            </div>
        </div>
    );
  
    // Handle the Signup/Login
    if (!isLoggedIn) return renderLogin();
  
 
    return(
        <></>
    )
};

