import bannerImg from '../../assets/images/banner.jpg';
import './Home.scss';
import {useEffect} from "react";
import {Link} from 'react-router-dom';
import api from '../../components/Util/api';

export default function Home(){
    let productsList=[];
    useEffect(() => {  
        const  fetchData = async ()=>{    
          try{
            productsList = await api.getproductsList();                 
          }  
          catch(e){
            console.error("Error in fetchData when Loading App",e);
          }
        }
        fetchData();
    }, []); 

    
    return(
        <>
        <div className="hero">
            <img src={bannerImg} alt="Annie Jewelry Store"></img>
            <h1>Valentine's Day Is Coming!</h1>
        </div>
        <div className='topsellers'>
            {productsList.map((product,index)=> (
                <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductCard proudct={product} />
                </Link>     
            ))}        
        </div>
        </>
    )
}