import './Product.scss';
import {useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import { useCart } from '../../components/CartProvider/CartProvider.js';
// import {Link} from 'react-router-dom';
import { getProductDetail,productImageBaseUrl} from '../../components/Util/api';
import CommentSection from '../../components/CommentSection/CommentSection.js';

export default function Product(){
    // Sample product data (replace with your actual product data)
    const {id} = useParams();
    const { cartList, setCartList} = useCart();
    const [currentProduct, setCurrentProduct] = useState();
    const [selectedImage, setSelectedImage] = useState();   
    const [imagesList,setImagesList] = useState();

  
    useEffect(() => {  
        const  fetchData = async ()=>{    
          try{                 
            const response= await getProductDetail(id);  
            setCurrentProduct(response);     
            setImagesList([response.main_img,...response.other_img]);
            setSelectedImage(response.main_img);
          }  
          catch(e){
            console.error("Error in fetchData when Loading App",e);
          }
        }
        fetchData();       
    }, [id]);     
    

    const handleThumbnailClick = (image) => {
      setSelectedImage(image);
    };
    
    
    const handleAddToCart = () => {     
      if(cartList){
        const index = cartList.findIndex((p)=>p.id === currentProduct.id);
        if (index !== -1) {
          // Item already exists in cart, update quantity          
          const updatedCartItems = [...cartList];
          updatedCartItems[index].qty += 1;
          const cartJSON = JSON.stringify(updatedCartItems);
          localStorage.setItem('AnnieSilverCart', cartJSON);
          localStorage.setItem('isCartOpen', true);
          setCartList(updatedCartItems);
        } else {
          // Item does not exist in cart, add it
          const updatedCartItems = [...cartList, { ...currentProduct, qty: 1 }];
          const cartJSON = JSON.stringify(updatedCartItems);
          localStorage.setItem('AnnieSilverCart', cartJSON);
          localStorage.setItem('isCartOpen', true);
          setCartList(updatedCartItems);
        }
      }
      else{
        const updatedCartItems=[{...currentProduct, qty: 1 }];
        const cartJSON = JSON.stringify(updatedCartItems);
        localStorage.setItem('AnnieSilverCart', cartJSON);
        localStorage.setItem('isCartOpen', true);
        setCartList(updatedCartItems);
      }      
    };


  const readyForRender = Boolean (imagesList?.[0] && currentProduct.name);
  return (
    readyForRender && (
      <>
        <div className="product">
          <div className="product__images">
              <div className="product__images--main">
                <img src={productImageBaseUrl+selectedImage} alt={currentProduct.name}/>
              </div>
              <div className="product__images--thumb">
                {imagesList.map((image, index) => (
                  <img
                    key={index}
                    src={productImageBaseUrl+image}
                    alt={`Product`}
                    className={selectedImage === image ? 'selected' : ''}
                    onClick={() => handleThumbnailClick(image)}
                  />
                ))}
              </div>
            </div>
          <div className="product__info">
            <h2>{currentProduct.name}</h2>
            <label>SKU: {currentProduct.sku}</label>
            <div className="product__info--bullet">
              <ul>
              {currentProduct.bullet_point.map((line, index) => (
                    <li key={index}>{line}</li>
              ))}
              </ul>
            </div>            
            <h3>Price: ${currentProduct.price}</h3>
            <div className='product__info--button'>
              <button onClick={handleAddToCart}><h3>Add to Cart</h3></button>
            </div>
          </div>          
        </div>           
      </>        
    )
  )  
}

