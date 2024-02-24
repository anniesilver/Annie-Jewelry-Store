import React, { createContext, useState, useContext } from 'react';

// Step 1: Create a context
const CartContext = createContext();

// Step 2: Create a provider component
const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState(false);
  return (
    <CartContext.Provider value={{ cartList, setCartList, loginStatus,setLoginStatus,searchKeywords, setSearchKeywords}}>
      {children}
    </CartContext.Provider>
  );
};

// Step 3: Create a consumer hook
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


// Step 4: Use the provider and consumer hook in your components

export { CartProvider,useCart };