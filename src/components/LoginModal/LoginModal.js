import React from "react";
import "./LoginModal.scss";
import { useState} from "react";
import {apiSignup,apiLogin} from "../Util/api";
import { useCart } from '../CartProvider/CartProvider';


export default function LoginModal({closeLoginModal}){
    const {loginStatus,setLoginStatus} = useCart();
    const [showSignup, setShowSignup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    if(loginStatus){
        closeLoginModal();
    }
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
          const response = await apiSignup(user);
          if(response.success)
          {
            sessionStorage.authToken = response.token;
            setIsLoggedIn(true);
            setLoginStatus(true);
            closeLoginModal();
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
          
          const response = await apiLogin(user);
          if(response.token)
          {
            setIsLoggedIn(true);
            sessionStorage.authToken = response.token;
            setLoginStatus(true);
            closeLoginModal();
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
      setShowSignup(false);
    };
    const handleLoginCancel = (e) => {
        setIsLoggedIn(true);
        closeLoginModal();
    }
    const handleSignUpCancel = (e) => {
        setShowSignup(false);
        closeLoginModal();
    }
    
    const handleSignupClick = (e) => {
        setShowSignup(true);        
    }


  
    const renderSignUp = () => (
        <div className="modal">
            <div className="modal__container">
                <h1>Sign Up</h1> 
                <form onSubmit={handleSignup}>
                    <div className="modal__input">
                        <label>Username: </label><input type="Email" name="email" />
                    </div>
                    <div className="modal__input">
                        <label>Password: </label><input type="password" name="password" />
                    </div>
                    <div className="modal__input">
                        <label>Firstname:  </label><input type="text" name="firstname" />
                    </div>
                    <div className="modal__input">
                        <label>Lastname:  </label> <input type="text" name="lastname" />
                    </div>
                    <div className="modal__opt">
                        <button type="submit" onClick={handleSignUpCancel}>
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
                    <div className="modal__input">
                        Username: <input type="Email" name="email" />
                    </div>
                    <div className="modal__input">
                        Password: <input type="password" name="password" />
                    </div>
                    <div className="modal__opt">
                        <button type="submit" onClick={handleLoginCancel}>
                            Cancel
                        </button>
                        <button type="submit">
                            Login
                        </button>
                    </div>
                    <h4 onClick={handleSignupClick}> New customer? Sign Up Now </h4> 
                </form>
            </div>
        </div>
    );
  
    // Handle the Signup/Login
    if (showSignup) return renderSignUp();
    if (!isLoggedIn) return renderLogin();
    
 
    return(
        <></>
    )
};

