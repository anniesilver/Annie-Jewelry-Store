import './Cart.scss'; // Import CSS for styling

const Cart = ({isOpen,handleClose,handleQtyUpdate,shoppingList}) => {

  console.log(shoppingList)

  return (
    <div className={`shopping-cart ${isOpen ? 'open' : ''}`}>
      <button onClick={handleClose} className="toggle-button">
        {isOpen && 'Close Cart'}
      </button>
      <div className="cart-content">
        {/* Cart items go here */}
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </div>
    </div>
  );
};

export default Cart;