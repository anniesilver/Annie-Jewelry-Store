import './Cart.scss'; // Import CSS for styling
import {Link} from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';

export default function Cart({isOpen,handleClose,handleQtyUpdate,cartList})
{
  console.log("show us what is in the shopping cart",cartList);

  return (
    <div className={`cart cart--${isOpen ? 'open' : 'close'}`}>      
      <div className="cart--content">
        {cartList.map((product,index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductCard product={product} mode="line" />
            </Link>     
        ))}       
      </div>
      <button onClick={handleClose} className="toggle-button">
        {isOpen && 'Close Cart'}
      </button>
    </div>
  );
}