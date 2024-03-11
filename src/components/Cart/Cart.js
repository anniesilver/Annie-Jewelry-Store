import './Cart.scss';
import {useNavigate} from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';
import closeIcon from "../../assets/icon/close-24px.svg";
import rightIcon from "../../assets/icon/right-24px.svg";
import { useCart } from '../CartProvider/CartProvider';
import {roundPrice} from '../Util/util';

export default function Cart({handleClose}){
  const {cartList, setCartList} = useCart();
  const navigate = useNavigate();
  const readinString = localStorage.getItem('isCartOpen');  

  let isCartOpen = false;
  if(readinString === "true"){
    isCartOpen=true;
  }

  function handleAddOne(e){
    const productId=parseInt(e.target.getAttribute('id'));
    const index = cartList.findIndex((p)=>p.id === productId);      
    const updatedCartItems = [...cartList];
    updatedCartItems[index].qty += 1;
    const cartJSON = JSON.stringify(updatedCartItems);
    localStorage.setItem('AnnieSilverCart', cartJSON);
    setCartList(updatedCartItems);           
  }
  function handleMinusOne(e){
    const productId=parseInt(e.target.getAttribute('id'));
    const index = cartList.findIndex((p)=>p.id === productId);        
    const updatedCartItems = [...cartList];
    if(updatedCartItems[index].qty=== 1)    {
      updatedCartItems.splice(index,1);
      const cartJSON = JSON.stringify(updatedCartItems);
      localStorage.setItem('AnnieSilverCart', cartJSON);
      setCartList(updatedCartItems);      
    }
    else{
      updatedCartItems[index].qty -= 1;
      const cartJSON = JSON.stringify(updatedCartItems);
      localStorage.setItem('AnnieSilverCart', cartJSON);
      setCartList(updatedCartItems);       
    }    
  }

  function handleRemove(e){
    const productId=parseInt(e.target.getAttribute('id'));  
    const updatedCartItems = [...cartList];
    const index = updatedCartItems.findIndex((p)=>p.id === productId);        
    updatedCartItems.splice(index,1);   
    const cartJSON = JSON.stringify(updatedCartItems);
    localStorage.setItem('AnnieSilverCart', cartJSON);
    setCartList(updatedCartItems);      
  }

  function handleViewCart(e){
    navigate('/shoppingcart');
    handleClose();
  }
  
  const subTotal = roundPrice(cartList.reduce((total, currentItem) => total + (currentItem.qty*currentItem.price), 0));

  return (    
    
      <div className={`cart ${isCartOpen ? 'cart--open' : ''}`}>     
        <div className="cart__header" onClick={handleClose}>
          <img src={rightIcon} alt=''></img>
          <h2>MY CART</h2>
        </div>
        <div className="cart__content">
          {cartList.map((product,index) => (
            <>
              <ProductCard product={product} mode="line" /> 
              <div className='cart__qty'>
                <div className='cart__qty--update'>
                  <p id={product.id} onClick={handleAddOne}>+</p>
                    <p>{product.qty}</p>
                  <p id={product.id} onClick={handleMinusOne}>-</p>   
                </div>          
                <div id={product.id} onClick={handleRemove} className='cart__qty--remove'>
                  <p >remove</p>
                  <img src={closeIcon} alt=''></img>
                </div>           
            </div>
            </>
          ))}      
        </div>
        <div className='cart__subtotal'>
          <h3>SubTotal</h3>
          <h4> ${subTotal}</h4>
        </div>
        
        <hr></hr>
        <div  className="cart__button">
          <button onClick={handleViewCart}>
            <h3>View Cart</h3>
          </button>
        </div>
      </div>
  )
}