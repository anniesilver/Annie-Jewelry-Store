import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home.js";
import Collection from "./pages/Collection/Collection.js";
import Product from "./pages/Product/Product.js";
import Checkout from "./pages/Checkout/Checkout.js";
import ShopingCart from "./pages/ShoppingCart/ShoppingCart.js";
import MyAccount from "./pages/MyAccount/MyAccount.js";
import ContactUs from "./pages/ContactUs/ContactUs.js";
import { CartProvider } from "./components/CartProvider/CartProvider.js";
import Header from "./components/Header/Header.js";


function App() {
  return (
      <>
        
        <BrowserRouter>
          <CartProvider>
            <Header />
            <main>
            <Routes>              
              <Route path="/" element={<Home />} />           
              <Route path="/collection/:id" element={<Collection />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/shoppingcart" element={<ShopingCart />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
            </main>
            <Footer />
          </CartProvider>
        </BrowserRouter>
      </>
    )
}

export default App;
