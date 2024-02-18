// PayPalButton.js

import React, { useEffect } from 'react';
import {useCart} from '../../components/CartProvider/CartProvider';
// const { PAYPAL_CLIENT_ID} = process.env;
const PAYPAL_CLIENT_ID = 'ASrSf2BqxbJrKbOSEgVCGLqv_EBsnn_r2tRhW7okcHFAhvB4zz_VgqGrFmIQX5bf0VN0fxpLYxNOo9iV'
const PayPalButton = () => {
  const {cartList, setCartList} = useCart();
  const baseUrl = "http://localhost:8080";
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=CAD`;
    
    script.addEventListener('load', () => {      
        window.paypal
        .Buttons({
          async createOrder() {
            try {
              const response = await fetch(`${baseUrl}/orders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer ACCESS-TOKEN",
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
          },
          async onApprove(data, actions) {
            
            try {
              console.log("paypal order id been created",data);
              const response = await fetch(`${baseUrl}/orders/${data.orderID}/capture`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
      
              const orderData = await response.json();
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
          },
        })
        .render("#paypal-button-container");
    });
    document.body.appendChild(script);
  }, []);
  // Example function to show a result to the user. Your site's UI library can be used instead.
  function resultMessage(message) {
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
  }
  return (
    <>
    <div id="paypal-button-container"></div>    
    <p id="result-message">{resultMessage}</p>
    </>
  );
};

export default PayPalButton;
