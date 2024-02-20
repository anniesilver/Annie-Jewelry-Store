import "./Checkout.scss";
import { useCart } from '../../components/CartProvider/CartProvider';
import ButtonWrapper from '../../components/PayPalButton/ButtonWrapper';
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {roundPrice} from '../../components/Util/util';
import {getProfile} from "../../components/Util/api";
import { useState,useEffect } from "react";
import LoginModal from "../../components/LoginModal/LoginModal";

export default function Checkout(){
    const {cartList, setCartList} = useCart();   
    const [loginModal,setLoginModal]=useState(false);
    const [userProfile,setUserProfile]=useState({});
    const PAYPAL_CLIENT_ID = 'ASrSf2BqxbJrKbOSEgVCGLqv_EBsnn_r2tRhW7okcHFAhvB4zz_VgqGrFmIQX5bf0VN0fxpLYxNOo9iV'

    const itemTotal = cartList.reduce((total, currentItem) => total + currentItem.qty, 0);
    const accumTotal= cartList.reduce((total, currentItem) => total + (currentItem.qty*currentItem.price), 0);
    
    const subTotal = roundPrice(accumTotal);
    const tax = roundPrice(accumTotal*0.13);
    const shippingFee = roundPrice((accumTotal<100 && accumTotal > 0) ? 10 : 0);
    const orderTotal = roundPrice(accumTotal + accumTotal*0.13 + shippingFee);
 
    useEffect(()=>{
        getUserProfile();
    },[])

    async function getUserProfile(){
      const decodeUser= await getProfile();
      console.log(decodeUser);
      setUserProfile(decodeUser);      
    }

    function handleLoginClick(e){
      setLoginModal(true);
    }
    function notifyParentRefresh(refresh){
      setLoginModal(false);
      getUserProfile();
      //this line is to refresh header compenent to get the login user name displayed there.
      setCartList([...cartList]);
    }
    return (
      <section className='checkout'> 
          <div className="checkout__paypal"> 
            <h1>Checkout</h1>
            <div className="checkout__contact">
            {
                userProfile ? (
                  <>
                  <h4>Wwelcome back {userProfile.firstname} {userProfile.lastname}</h4>
                  <h4>Contact email :{userProfile.email} </h4>
                  </>
                ):(
                  <>
                  <h2>Have an account?</h2>
                  <label onClick={handleLoginClick}>Login to checkout easily</label>   
                  </>   
                )
            }              
            </div>
            
            <div className="checkout__paypal--container">
            <div style={{maxWidth:"750px", minHeight:"200px"}}>
                <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, components: "buttons", currency: "CAD" }}>
                    <ButtonWrapper showSpinner={false} />
                </PayPalScriptProvider>
            </div>
            </div>
          </div>
          <div className='checkout__info'>
            <div className="checkout__info--header">
              <h3>Summary</h3>
              <h4>({itemTotal} Items)</h4>
            </div>            
            <div className="checkout__list">            
              {cartList.map((product,index) => (
                <div className='checkout__item'>              
                  <h5>{product.name}</h5>
                  <h5>{product.price} x {product.qty}</h5>
                </div>          
              ))}      
            </div>
            
            <div className='checkout__summary'>   
            <hr></hr>     
              <ul>
                <p>subtotal</p>
                <p>${subTotal}</p>
              </ul>
              <ul>
                <p>shipping</p>
                <p>${shippingFee}</p>
              </ul>
              <ul>
                <p>tax</p>
                <p>${tax}</p>
              </ul>
              <hr></hr>
              <ul>
                <h3>Order Total</h3>
                <h4>CAD ${orderTotal}</h4>
              </ul>          
            </div>

        </div>
        {
            loginModal && (<LoginModal notifyParentRefresh={notifyParentRefresh}/>)
        }  
    </section>
    );
}