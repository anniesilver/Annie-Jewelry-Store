import { useCart } from '../../components/CartProvider/CartProvider';
import ButtonWrapper from '../../components/PayPalButton/ButtonWrapper';
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
export default function Checkout(){
    const {cartList, setCartList} = useCart();   
    const PAYPAL_CLIENT_ID = 'ASrSf2BqxbJrKbOSEgVCGLqv_EBsnn_r2tRhW7okcHFAhvB4zz_VgqGrFmIQX5bf0VN0fxpLYxNOo9iV'

 
    // return(
    //   <div className='checkout__paypal'>
    //   <PayPalButton />
    //   </div>
    // )
    return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, components: "buttons", currency: "CAD" }}>
              <ButtonWrapper showSpinner={false} />
          </PayPalScriptProvider>
      </div>
  );
}