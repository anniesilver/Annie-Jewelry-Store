// Custom component to wrap the PayPalButtons and show loading spinner
import {PayPalButtons,usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useCart} from '../../components/CartProvider/CartProvider';

export default function ButtonWrapper({ showSpinner }){
    const [{ isPending }] = usePayPalScriptReducer();
    const {cartList, setCartList} = useCart();
    // This value is from the props in the UI
    const style = {
        "layout":"vertical",
        "color":"silver",
        "shape":"pill"
    };
    const baseUrl = "http://localhost:8080";
    
    async function createOrder() {
        const token = sessionStorage.getItem("authToken");
        try {
          const response = await fetch(`${baseUrl}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" :`Bearer ${token}`,              
              "PayPal-Partner-Attribution-Id": "BN-CODE",
              "PayPal-Auth-Assertion": "PAYPAL-AUTH-ASSERTION"
            },            
            body: JSON.stringify(cartList),
          });
          // console.log("before loading paypal button, the cartList",cartList);
          // const orderData = await axios.post(`${baseUrl}/orders`,cartList);
          // console.log("reponse order id from local server",orderData.id)
          const orderData = await response.json();
          if (orderData.id) {
            return orderData.id;
          } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);
    
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(error);
          resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
        }
    }
    async function onApprove(data, actions) { 
        const token = sessionStorage.getItem("authToken");
        try {
          console.log("paypal order id been created",data);
          const response = await fetch(`${baseUrl}/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" :`Bearer ${token}`, 
            },
          });
    
          const orderData = await response.json();
          console.log("we got the reponse from my server",orderData);
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message
    
          const errorDetail = orderData?.details?.[0];
    
          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
          } else if (!orderData.purchase_units) {
            throw new Error(JSON.stringify(orderData));
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
              orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
            resultMessage(
              `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
            );
            //transaction succeed, empty shopping cart for now
            setCartList([]);
            console.log(
              "Capture result",
              orderData,
              JSON.stringify(orderData, null, 2),
            );
          }
        } catch (error) {
          console.error(error);          
          resultMessage(
            `Sorry, your transaction could not be processed...<br><br>${error}`,
          );
        }
    }
    function resultMessage(message) {
        const container = document.querySelector("#result-message");
        container.innerHTML = message;
    }

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
            <p id="result-message">{resultMessage}</p>
        </>
    );
}
