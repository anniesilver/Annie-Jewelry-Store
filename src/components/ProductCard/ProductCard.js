import {productImageBaseUrl} from '../Util/api';
import { useNavigate } from 'react-router-dom';
import './ProductCard.scss'
export default function ProductCard({product,mode}){
    let usingClass='';
    const navigate=useNavigate();
    switch(mode){
        case 'block':
            usingClass = "productcard__block";
            break;
        case 'line':
            usingClass = "productcard__line";
            break;
        default:
            usingClass = ''
    }
    function onClick(e){
        navigate(`/product/${product.id}`);
    }

    return(
        <div className={usingClass} id={product.id} onClick={onClick}>
            <img src={productImageBaseUrl+product.main_img} alt={product.name}></img>
            <div className="productcard__info">            
                <p>{product.name}</p>              
                    {product.discount_price && (
                            <p className="productcard__price--cross">${product.price}</p>                        
                        )                    
                    }   
                <div className="productcard__price">${product.price}</div>                
            </div>
            
        </div>    
    );

}