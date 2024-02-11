import "./Header.scss";
import logo from '../../assets/logo/LOGO.jpg';
import myaccount from '../../assets/icon/account.svg';
import cart from '../../assets/icon/cart.svg';
import search from '../../assets/icon/search.svg';
import {Link} from 'react-router-dom';
import {useCart} from '../../components/CartProvider/CartProvider';
import Cart from '../../components/Cart/Cart';
import {useState} from 'react';

export default function Header(){
    const [isFloatingVisible,setFloatingVisible]=useState(false);
    const { cartList, setcartList} = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    
      const  handleCartClose = () => {        
        setIsCartOpen(false);
      };

      const handleQtyUpdate () => {       

      }
    return(
    <header className="header">
        <div className="header__container">
            <div className="header__logo">
                <a href="/"><img src={logo} alt="Annie Jewelry Store"></img></a>           
            </div>      
            <div className="header__container--group">
                <div className="header__account">
                    <img src={myaccount} alt="Annie Jewelry Store"></img> 
                    <p>Login</p>         
                </div> 
                <div className="header__cart">
                    <a href="/"><img src={cart} alt="Annie Jewelry Store"></img></a>           
                </div>
            </div>             
        </div>                 
        <nav className="header__navbar"> 
            <div className="header__nav"> 
                <div className="header__menu">             
                    <Link to="/"><li>Home</li></Link>
                </div> 
                <div className="header__menu" onMouseOver={()=> {setFloatingVisible(true)}} onMouseLeave={()=> {setFloatingVisible(false)}}>   
                    <Link to="/category"><li>Category</li></Link>                    
                </div> 
                <div className="header__menu">   
                    <Link to="/contactus"><li>Contact Us</li></Link>
                </div> 
            </div>     
            <div className="header__search">
                <input type="search" placeholder="Search"/>   
                <img src={search} alt="Search Annie Jewelry"></img>  
            </div>                                            
        </nav>   
        {isFloatingVisible && (      
            <div className="header__floating">
                <ul>
                    <li>Silver Collection</li>
                    <li>Freshwater Pearl</li>
                    <li>Golden Collection</li>
                </ul>
            </div>
        )}     
        <Cart isOpen={isCartOpen} 
        handleClose={handleCartClose} 
        handleQtyUpdate={handleQtyUpdate}
        cartList={cartList} />
        
    </header>
    )
}