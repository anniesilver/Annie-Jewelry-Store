import "./Checkout.scss";
import { useCart } from '../../components/CartProvider/CartProvider';
import PaypalButtonWrapper from '../../components/PaypalButtonWrapper/PaypalButtonWrapper';
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {roundPrice} from '../../components/Util/util';
import {getProfile,PAYPAL_CLIENT_ID} from "../../components/Util/api";
import { useState,useEffect } from "react";
import LoginModal from "../../components/LoginModal/LoginModal";


export default function Checkout(){
    const {cartList, loginStatus} = useCart();   
    const isCartEmpty = Boolean(cartList.length === 0);
    const [loginModal,setLoginModal]=useState(false);
    const [userProfile,setUserProfile]=useState({});
  
    let loginModalMode="";

    const itemTotal = cartList.reduce((total, currentItem) => total + currentItem.qty, 0);
    const accumTotal= cartList.reduce((total, currentItem) => total + (currentItem.qty*currentItem.price), 0);
    
    const subTotal = roundPrice(accumTotal);
    const tax = roundPrice(accumTotal*0.13);
    const shippingFee = roundPrice((accumTotal<100 && accumTotal > 0) ? 10 : 0);
    const orderTotal = roundPrice(accumTotal + accumTotal*0.13 + shippingFee);
 
    useEffect(()=>{
      if(loginStatus){
        getUserProfile();
      }
      else{
        setUserProfile({});
      }       
    },[loginStatus])

    async function getUserProfile(){
      const decodeUser= await getProfile();
      setUserProfile(decodeUser);      
    }

    function handleLoginClick(e){
      loginModalMode="login";
      setLoginModal(true);
    }
    function closeLoginModal(){
      setLoginModal(false);    
    }
    function handleSigupClick(){
      loginModalMode="signup";
      setLoginModal(true);    
    }
    
    return (
      <section className='checkout'> 
          <div className="checkout__paypal"> 
            <h1>Checkout</h1>
            <div className="checkout__contact">
            {
                loginStatus ? (
                  <>
                  <h3>Welcome back  {userProfile.firstname} {userProfile.lastname}</h3>
                  <h3>Contact email :{userProfile.email} </h3>
                  </>
                ):(
                  <>
                  <h3>Have an account?</h3>
                  <label onClick={handleLoginClick}>Login to checkout easily</label>   
                  </>   
                )
            }              
            </div>
            {
              loginStatus ? (
                <div className="checkout__paypal--container">
                    <div style={{maxWidth:"750px", minHeight:"200px"}}>
                        <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, components: "buttons", currency: "CAD" }}>
                            <PaypalButtonWrapper showSpinner={false} />
                        </PayPalScriptProvider>
                    </div>
               </div>
              ):(
                <></>
              )
            }            
          </div>
          {
              !isCartEmpty && (
              <div className='checkout__info'>
                <div className="checkout__info--header">
                  <h3>Summary</h3>
                  <h4>({itemTotal} Items)</h4>
                </div>            
                <div className="checkout__list">            
                  {cartList.map((product,index) => (
                    <div className='checkout__item'>              
                      <p>{product.name}</p>
                      <p>{product.price} x {product.qty}</p>
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
        

              </div>)
          }
        {
            loginModal && (<LoginModal closeLoginModal={closeLoginModal} mode={loginModalMode}/>)
        }  
    </section>
    );
}