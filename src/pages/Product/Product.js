import './Product.scss';
import {useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { getProductDetail } from '../../components/Util/api';

export default function Product(){
    // Sample product data (replace with your actual product data)
    const { id } = useParams();
    const [currentId, setCurrentId]=useState(id);
    console.log("current product ID",currentId);
    let  product={};
    useEffect(() => {  
        const  fetchData = async ()=>{    
          try{
            const response = await getProductDetail(currentId);   
            
            product = response; 

            setCurrentId(response.id);
          }  
          catch(e){
            console.error("Error in fetchData when Loading App",e);
          }
        }
        fetchData();
    }, [currentId]); 

    // const images=[...product.other_img];
    // const [selectedImage, setSelectedImage] = useState(images[0]);

    // const handleThumbnailClick = (image) => {
    //     setSelectedImage(image);
    // };

  const handleAddToCart = () => {    
    console.log('Product added to cart:', product);
  };

  return (
    <div className="product-detail-page">
      {/* <div className="product-images">
        <div className="main-image">
          <img src={selectedImage} alt="Main Product Image" />
        </div>
        <div className="thumbnail-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className={selectedImage === image ? 'selected' : ''}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        {product.bullet_point.map((line, index) => (
              <li key={index}>line</li>
          ))}
        <p>Price: ${product.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div> */}
    </div>
  );
};

