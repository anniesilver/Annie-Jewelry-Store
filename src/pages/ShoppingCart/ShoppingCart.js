import './ShoppingCart.scss';
import {useCart} from '../../components/CartProvider/CartProvider';
import ProductCard from '../../components/ProductCard/ProductCard';
import closeIcon from "../../assets/icon/close-24px.svg";
import {useNavigate} from 'react-router-dom';
import {roundPrice} from '../../components/Util/util';


export default function ShoppingCart(){
    const {cartList, setCartList} = useCart();
    const navigate=useNavigate();

    function handleAddOne(e){
      const productId=parseInt(e.target.getAttribute('id'));
      const index = cartList.findIndex((p)=>p.id === productId);      
      const updatedCartItems = [...cartList];
      updatedCartItems[index].qty += 1;
      setCartList(updatedCartItems);   
      const cartJSON = JSON.stringify(updatedCartItems);
      localStorage.setItem('AnnieSilverCart', cartJSON);
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

    function handleCheckOutClick(e){
        navigate("/checkout");
    }

    const itemTotal = cartList.reduce((total, currentItem) => total + currentItem.qty, 0);
    const accumTotal= cartList.reduce((total, currentItem) => total + (currentItem.qty*currentItem.price), 0);
    
    const subTotal = roundPrice(accumTotal);
    const tax = roundPrice(accumTotal*0.13);
    const shippingFee = roundPrice((accumTotal<100 && accumTotal > 0) ? 10 : 0);
    const orderTotal = roundPrice(accumTotal + accumTotal*0.13 + shippingFee);

    return(
      <div className='shoppingcart'>
        <div className="shoppingcart__content">
          <h2>My Cart ({itemTotal} )Items</h2>
          {cartList.map((product,index) => (
            <div className='shoppingcart__item'>              
              <ProductCard product={product} mode="line" />
              <div className='shoppingcart__qty'>
                <div className='shoppingcart__qty--update'>
                  <p id={product.id} onClick={handleAddOne}>+</p>
                    <p>{product.qty}</p>
                  <p id={product.id} onClick={handleMinusOne}>-</p>   
                </div>          
                <div id={product.id} onClick={handleRemove} className='shoppingcart__qty--remove'>
                  <p >remove</p>
                  <img src={closeIcon} alt=''></img>
                </div>           
              </div>
              
            </div>
          ))}      
        </div>
        <div className='shoppingcart__summary'>
          <h3>Summary</h3>
          <ul>
            <li>subtotal</li>
            <li>${subTotal}</li>
          </ul>
          <ul>
            <li>shipping</li>
            <li>${shippingFee}</li>
          </ul>
          <ul>
            <li>tax</li>
            <li>${tax}</li>
          </ul>
          <hr></hr>
          <ul>
            <h3>Order Total</h3>
            <h4>CAD ${orderTotal}</h4>
          </ul>          
 
          <div  className="shoppingcart__button">
            <button onClick={handleCheckOutClick}>
              <h3>Check Out</h3>
            </button>
          </div>          
        </div>
      </div>
    )
}