import './Cart.scss';
import {Link} from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';
import closeIcon from "../../assets/icon/close-24px.svg";
import rightIcon from "../../assets/icon/right-24px.svg";
import { useCart } from '../CartProvider/CartProvider';


export default function Cart({isOpen,handleClose})
{
  const {cartList, setCartList} = useCart();
  let showCart;
  console.log("show me the  shopping cart",cartList);
  if(cartList.length===0 || !isOpen)
  {
    console.log("empty shopping cart",cartList);
    showCart=false;
  }
  else{
    showCart = true;
  }
  function handleAddOne(e){
    const productId=parseInt(e.target.getAttribute('id'));
    const index = cartList.findIndex((p)=>p.id === productId);      
    const updatedCartItems = [...cartList];
    updatedCartItems[index].qty += 1;
    setCartList(updatedCartItems);   
  }
  function handleMinusOne(e){
    const productId=parseInt(e.target.getAttribute('id'));
    const index = cartList.findIndex((p)=>p.id === productId);        
    const updatedCartItems = [...cartList];
    if(updatedCartItems[index].qty=== 1)    {
      updatedCartItems.splice(index,1);
      setCartList(updatedCartItems);
    }
    else{
      updatedCartItems[index].qty -= 1;
      setCartList(updatedCartItems); 
    }    
  }
  function handleRemove(e){
    const productId=parseInt(e.target.getAttribute('id'));
    const index = cartList.findIndex((p)=>p.id === productId)-1;      
    const updatedCartItems = [...cartList];
    updatedCartItems.splice(index,1)
    setCartList(updatedCartItems);
  }
  
  const subTotal = cartList.reduce((total, currentItem) => total + (currentItem.qty*currentItem.price), 0);
  
  return ( 
      <div className={`cart ${showCart ? 'cart--open' : ''}`}>      
        <div className="cart__header" onClick={handleClose}>
          <img src={rightIcon}></img>
          <h2>SHOPPING CART</h2>
        </div>
        <div className="cart__content">
          {cartList.map((product,index) => (
            <>
              <Link to={`/product/${product.id}`} key={product.id}>
                      <ProductCard product={product} mode="line" />
              </Link>     
              <div className='cart__qty'>
                <div className='cart__qty--update'>
                  <p id={product.id} onClick={handleAddOne}>+</p>
                    <p>{product.qty}</p>
                  <p id={product.id} onClick={handleMinusOne}>-</p>   
                </div>          
                <div id={product.id} onClick={handleRemove} className='cart__qty--remove'>
                  <p >remove</p>
                  <img src={closeIcon}></img>
                </div>           
            </div>
            </>
          ))}      
        </div>
        <h2>SubTotal</h2>
        <h3> ${subTotal}</h3>
        <hr></hr>
        <div  className="cart__button">
          <button onClick={handleClose}>
            {showCart && 'Close Cart'}
          </button>
        </div>
      </div>
  );
}