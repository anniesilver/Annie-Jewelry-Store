import bannerImg from '../../assets/images/banner.jpg';
import './Home.scss';
import {useEffect,useState} from "react";
import {Link} from 'react-router-dom';
import {getProductsList} from '../../components/Util/api';
import ProductCard from '../../components/ProductCard/ProductCard';


export default function Home(){
   // const [startIndex,setStartIndex]=useState(0);
    const [productsList,setProductsList]=useState([]);
    useEffect(() => {  
        const  fetchData = async ()=>{    
          try{
            const list = await getProductsList();    
            setProductsList(list);
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
                    <ProductCard product={product} />
                </Link>     
            ))}        
        </div>
        </>
    )
}