import "./Checkout.scss";
import { useCart } from '../../components/CartProvider/CartProvider';
import ButtonWrapper from '../../components/PayPalButton/ButtonWrapper';
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {roundPrice} from '../../components/Util/util';
export default function Checkout(){
    const {cartList, setCartList} = useCart();   
    const PAYPAL_CLIENT_ID = 'ASrSf2BqxbJrKbOSEgVCGLqv_EBsnn_r2tRhW7okcHFAhvB4zz_VgqGrFmIQX5bf0VN0fxpLYxNOo9iV'

    const itemTotal = cartList.reduce((total, currentItem) => total + currentItem.qty, 0);
    const accumTotal= cartList.reduce((total, currentItem) => total + (currentItem.qty*currentItem.price), 0);
    
    const subTotal = roundPrice(accumTotal);
    const tax = roundPrice(accumTotal*0.13);
    const shippingFee = roundPrice((accumTotal>100) ? 0 : 10);
    const orderTotal = roundPrice(accumTotal + accumTotal*0.13 + shippingFee);

    return (
      <section className='checkout'>
        
        <div className="checkout__paypal">          
          <h1>Checkout</h1>
          <div className="checkout__paypal--container">
          <div style={{maxWidth:"750px", minHeight:"200px"}}>
              <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, components: "buttons", currency: "CAD" }}>
                  <ButtonWrapper showSpinner={false} />
              </PayPalScriptProvider>
          </div>
          </div>
        </div>
        <div className='checkout__info'>
          <h2>{itemTotal} Items</h2>
          <div className="checkout__list">            
            {cartList.map((product,index) => (
              <div className='checkout__item'>              
                <h5>{product.name}</h5>
                <p> x {product.qty}</p>
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
    </section>
    );
}