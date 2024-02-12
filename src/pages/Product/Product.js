import './Product.scss';
import {useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import { useCart } from '../../components/CartProvider/CartProvider.js';
// import {Link} from 'react-router-dom';
import { getProductDetail,productImageBaseUrl} from '../../components/Util/api';

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
          setCartList(updatedCartItems);
        } else {
          // Item does not exist in cart, add it
          setCartList([...cartList, { ...currentProduct, qty: 1 }]);
        }
      }
      else{
        setCartList([...cartList, { ...currentProduct, qty: 1 }]);
      }      
    };


  const readyForRender = Boolean (imagesList?.[0] && currentProduct.name);
  return (
    
      readyForRender && (
        <>
        <div className="product">
      <div className="product__images">
        <div className="product__images--main">
          <img src={productImageBaseUrl+selectedImage} alt="product"/>
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
        <h1 className="product__info--name">{currentProduct.name}</h1>
        <div className="product__info--bullet">
          {currentProduct.bullet_point.map((line, index) => (
                <li key={index}>{line}</li>
          ))}
        </div>
        
        <p>Price: ${currentProduct.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>   
    </>
    )    
  );
}

