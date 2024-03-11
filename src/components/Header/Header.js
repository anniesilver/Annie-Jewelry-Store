import "./Header.scss";
import logo from '../../assets/logo/LOGO.jpg';
import myaccount from '../../assets/icon/account.svg';
import cart from '../../assets/icon/cart.svg';
import search from '../../assets/icon/search.svg';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../../components/CartProvider/CartProvider';
import Cart from '../../components/Cart/Cart';
import {useState,useEffect} from 'react';
import LoginModal from "../LoginModal/LoginModal";
import {getProfile} from "../Util/api";

export default function Header(){
    const [isFloatingMenuOn,setisFloatingMenuOn]=useState(false);
    const [isAccountMenuOn,setIsAccountMenuOn] =useState(false);
    const {cartList, setCartList,loginStatus,setLoginStatus,setSearchKeywords} = useCart();    
    const [loginModal,setLoginModal]=useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
  
    async function getUserProfile(){
        const decodeUser= await getProfile();
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
            setIsAccountMenuOn(!isAccountMenuOn);
            setLoginModal(false);
        }   
        else{ 
            setLoginModal(true);
        }     
    }
    const handleLogout = () =>{
        setLoginStatus(false);
        setIsAccountMenuOn(false);
    }

    function closeLoginModal(){
        setLoginModal(false);
    }
    function onMouseLeaveAccountDrop(){
        setIsAccountMenuOn(false);
    }
    function handleSearchKeyDown(e){        
        if(e.keyCode === 13){  
            const keywrods= e.target.value.split(" ").filter(word => word !== ""); 
            setSearchKeywords(keywrods);
            navigate('/search');
            if(document.getElementById("menu_home").classList.contains("header__menu--highlight")){
                document.getElementById("menu_home").classList.remove("header__menu--highlight");
            }            
            if(document.getElementById("menu_collection").classList.contains("header__menu--highlight")){
                document.getElementById("menu_collection").classList.remove("header__menu--highlight");
            }            
        }         
    }
    function handleMenuClick(e){
        if(e.target.id==="menu_home"){
            if(!e.target.classList.contains("header__menu--highlight")){
                e.target.classList.add("header__menu--highlight");
                document.getElementById("menu_collection").classList.remove("header__menu--highlight");
            }    
            navigate('/');        
        }
        if(e.target.id==="menu_collection"){
            if(!e.target.classList.contains("header__menu--highlight")){
                e.target.classList.add("header__menu--highlight");
                document.getElementById("menu_home").classList.remove("header__menu--highlight");
            }          
            navigate('/collection/0');      
        }
        if(e.target.id==="collection_1"){
            if(document.getElementById("menu_home").classList.contains("header__menu--highlight")){
                document.getElementById("menu_home").classList.remove("header__menu--highlight");
                document.getElementById("menu_collection").classList.add("header__menu--highlight");
            }            
            navigate('/collection/1');      
        }
        if(e.target.id==="collection_2"){
            if(document.getElementById("menu_home").classList.contains("header__menu--highlight")){
                document.getElementById("menu_home").classList.remove("header__menu--highlight");
                document.getElementById("menu_collection").classList.add("header__menu--highlight");
            }            
            navigate('/collection/2');      
        }
        if(e.target.id==="collection_3"){
            if(document.getElementById("menu_home").classList.contains("header__menu--highlight")){
                document.getElementById("menu_home").classList.remove("header__menu--highlight");
                document.getElementById("menu_collection").classList.add("header__menu--highlight");
            }            
            navigate('/collection/3');      
        }
    }
       
    const totalQty = cartList.reduce((total, currentItem) => total + currentItem.qty, 0);
    const showQty = Boolean(totalQty>0);
    console.log("show number",showQty);
    return(
    <header className="header">
        <div className="header__container">
            <div className="header__logo">
                <a href="/"><img src={logo} alt="Annie Jewelry Store"></img></a>           
            </div>                  
            <div className="header__group">                
                <div className="header__account" onClick={handleLoginClick}>
                { 
                    loginStatus && (
                        <p>{userInfo.firstname}</p>
                    )    
                }                
                    <img src={myaccount} alt=""></img>                                   
                </div> 
                {
                    isAccountMenuOn && (                    
                        <div className="header__account--drop" onMouseLeave={onMouseLeaveAccountDrop}>
                            <p>My account</p>
                            <p>Order history</p>
                            {loginStatus && (<p onClick={handleLogout}>Logout</p>)}
                        </div>
                    )
                }
                <div className="header__cart" onClick={handleCartClick}>      
                {
                    showQty && (
                    <p> {totalQty}</p>
                    )
                }         
                    <img src={cart} alt="Annie Jewelry Store"></img>       
                </div>
            </div>             
        </div>                 
        <nav className="header__navbar"> 
            <div className="header__nav"> 
                <div className="header__menu">             
                    <li id="menu_home" onClick={handleMenuClick}>Home</li>
                </div> 
                <div className="header__menu" onMouseOver={()=> {setisFloatingMenuOn(true)}} onMouseLeave={()=> {setisFloatingMenuOn(false)}}>   
                
                    <li id="menu_collection" onClick={handleMenuClick} >Collections</li>
                    {isFloatingMenuOn && (      
                        <div className="header__floating" onMouseOver={()=> {setisFloatingMenuOn(true)}} onMouseLeave={()=> {setisFloatingMenuOn(false)}} onClick={()=> {setisFloatingMenuOn(false)}} >
                            <ul>
                                <li id="collection_1" onClick={handleMenuClick}>Silver Collection</li>
                                <li id="collection_2" onClick={handleMenuClick}>Freshwater Pearl</li>
                                <li id="collection_3" onClick={handleMenuClick}>Golden Collection</li>
                            </ul>
                        </div>
                    )}                   
                </div> 
                
            </div>       
            <div className="header__search">
                <input type="search" placeholder="Search" onKeyDown={handleSearchKeyDown}/>   
                <img src={search} alt="Search Annie Jewelry"></img>  
            </div>                                            
        </nav>   
             
        <Cart handleClose={handleCartClose}/>        
        {
            loginModal && (<LoginModal closeLoginModal={closeLoginModal}/>)
        }     
    </header>
    )
}