import "./Header.scss";
import logo from '../../assets/logo/LOGO.jpg';
import myaccount from '../../assets/icon/account.svg';
import cart from '../../assets/icon/cart.svg';
import search from '../../assets/icon/search.svg';
import {Link} from 'react-router-dom';
import {useCart} from '../../components/CartProvider/CartProvider';
import Cart from '../../components/Cart/Cart';
import {useState,useEffect} from 'react';
import LoginModal from "../LoginModal/LoginModal";
import {getProfile} from "../Util/api";

export default function Header(){
    const [isFloatingMenuOn,setisFloatingMenuOn]=useState(false);
    const [isAccountMenuOn,setIsAccountMenuOn] =useState(false);
    const {cartList, setCartList,loginStatus,setLoginStatus} = useCart();    
    const [loginModal,setLoginModal]=useState(false);
    const [userInfo, setUserInfo] = useState({});
   
  
    async function getUserProfile(){
        const decodeUser= await getProfile();
        console.log(decodeUser);
        if(decodeUser){
            setUserInfo(decodeUser); 
        }        
    }
    useEffect(() => { 
        if(loginStatus){
            getUserProfile();
        }        
        else{
            setUserInfo({});
        }
        const cartJSON = localStorage.getItem('AnnieSilverCart');
        if(cartJSON){            
            setCartList(JSON.parse(cartJSON));            
        } 
    }, [loginStatus]);   
    
    const  handleCartClick = () => {      
        localStorage.setItem("isCartOpen","true");
        setCartList([...cartList]);        
    };

    const handleCartClose = () =>{
        localStorage.setItem('isCartOpen',false);
        setCartList([...cartList]);        
    }
    const handleLoginClick = () =>{
        if(loginStatus){
            console.log("loginModal",loginModal);
            setIsAccountMenuOn(!isAccountMenuOn);
            setLoginModal(false);
        }   
        else{
            console.log("not logged in, show loginModal",loginModal);
            setLoginModal(true);
        }     
    }
    const handleLogout = () =>{
        setLoginStatus(false);
        setIsAccountMenuOn(false);
    }

    function closeLoginModal(refresh){
        // if(refresh){
        //     getUserProfile();
        // }
        setLoginModal(false);
    }


    const totalQty = cartList.reduce((total, currentItem) => total + currentItem.qty, 0);

    return(
    <header className="header">
        <div className="header__container">
            <div className="header__logo">
                <a href="/"><img src={logo} alt="Annie Jewelry Store"></img></a>           
            </div>      
            <div className="header__container--group">
                <div className="header__account" onClick={handleLoginClick}>
                    <img src={myaccount} alt="Annie Jewelry Store"></img> 
                    { 
                        loginStatus ? (
                            <p>{userInfo.firstname}</p>
                        ):(
                            <p>Login</p>
                        )             
                    }                           
                </div> 
                {
                    isAccountMenuOn && (                    
                        <div className="header__account--drop">
                            <p>my account</p>
                            <p>order history</p>
                            {loginStatus && (<p onClick={handleLogout}>Logout</p>)}
                        </div>
                    )
                }
                <div className="header__cart" onClick={handleCartClick}>
                    <p>{totalQty}</p>
                    <img src={cart} alt="Annie Jewelry Store"></img>       
                </div>
            </div>             
        </div>                 
        <nav className="header__navbar"> 
            <div className="header__nav"> 
                <div className="header__menu">             
                    <Link to="/"><li>Home</li></Link>
                </div> 
                <div className="header__menu" onMouseOver={()=> {setisFloatingMenuOn(true)}} onMouseLeave={()=> {setisFloatingMenuOn(false)}}>   
                    <Link to="/collection/0"><li>Category</li></Link>                    
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
        {isFloatingMenuOn && (      
            <div className="header__floating" onMouseOver={()=> {setisFloatingMenuOn(true)}} onMouseLeave={()=> {setisFloatingMenuOn(false)}} onClick={()=> {setisFloatingMenuOn(false)}} >
                <ul>
                    <Link to="/collection/1"><li>Silver Collection</li></Link>
                    <Link to="/collection/2"><li>Freshwater Pearl</li></Link>
                    <Link to="/collection/3"><li>Golden Collection</li></Link>                 
                </ul>
            </div>
        )}     
        <Cart handleClose={handleCartClose}/>        
        {
            loginModal && (<LoginModal closeLoginModal={closeLoginModal}/>)
        }     
    </header>
    )
}