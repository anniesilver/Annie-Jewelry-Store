import {productImageBaseUrl} from '../Util/api';
import './ProductCard.scss'
export default function ProductCard({product,mode}){
    let usingClass='';
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

    return(
        <div className={usingClass}>
            <img src={productImageBaseUrl+product.main_img} alt={product.name}></img>
            <div className="productcard__info">            
                <p>{product.name}</p>              
                    {product.discount_price && (
                            <p className="productcard__price--cross">${product.price}</p>                        
                        )                    
                    }   
                <div className="productcard__price">${product.price}</div>
                <div className='productcard__qty'>
                    <p>+</p>
                    <p>{product.qty}</p>
                    <p>-</p>
                </div>
            </div>
            
        </div>    
    );

}