import React, { createContext, useState, useContext } from 'react';

// Step 1: Create a context
const CartContext = createContext();

// Step 2: Create a provider component
const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState(0);

  return (
    <CartContext.Provider value={{ cartList, setCartList }}>
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