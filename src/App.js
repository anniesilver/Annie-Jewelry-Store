import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home.js";
import Category from "./pages/Category/Category.js";
import Product from "./pages/Product/Product.js";
import Search from "./pages/Search/Search.js";
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
              <Route path="/category" element={<Category />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/search" element={<Search />} />
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
