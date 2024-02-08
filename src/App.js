import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home.js";
import Category from "./pages/Category/Category.js";
import Product from "./pages/Product/Product.js";
import Search from "./pages/Search/Search.js";
import Cart from "./pages/Cart/Cart.js";
import MyAccount from "./pages/MyAccount/MyAccount.js";
import ContactUs from "./pages/ContactUs/ContactUs.js";


function App() {
  return (
      <>
        
        <BrowserRouter>
          <Header />
          <main>
          <Routes>              
            <Route path="/" element={<Home />} />           
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </>
    )
}

export default App;
