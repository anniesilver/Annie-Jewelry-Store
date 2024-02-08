import {productImageBaseUrl} from '../Util/api';
import './ProductCard.scss'
export default function ProductCard({product,mode}){
    if(mode){
        console.log("product mode:",mode);
    }
    return(
        <div className="productcard">
            <img src={productImageBaseUrl+product.main_img} alt={product.name}></img>
            <div className="productcard__info">            
                <li>{product.name}</li>              
                    {product.discount_price ? (
                        <li className="productcard__info--cross">${product.price}</li>                        
                    ):(
                        <li>${product.price}</li>
                    )}   
            </div>
        </div>    
    );

}