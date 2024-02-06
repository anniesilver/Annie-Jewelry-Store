export default function ProductCard({product,mode}){
    if(mode){
        console.log("product mode:",mode);
    }
    return(
        <div className="productcard">
            <img src={product.main_img} alt={product.name}></img>
            <div className="productcard__price">
                <li>${product.name}</li>
                <li>${product.discount_price}</li>
                <li>${product.discount_price}</li>
            </div>
        </div>
    
    );

}