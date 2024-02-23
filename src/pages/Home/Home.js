import bannerImg from '../../assets/images/banner.jpg';
import './Home.scss';
import {useEffect,useState} from "react";
import {Link} from 'react-router-dom';
import {getTopSellers} from '../../components/Util/api';
import ProductCard from '../../components/ProductCard/ProductCard';


export default function Home(){
   // const [startIndex,setStartIndex]=useState(0);
    const [productsList,setProductsList]=useState([]);
    useEffect(() => {  
        const  fetchData = async ()=>{    
          try{
            const list = await getTopSellers(4);
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
        <section className="hero">
            <img src={bannerImg} alt="Annie Jewelry Store"></img>
            <h1>Valentine's Day Is Coming!</h1>
        </section>
        <section className='topsellers'>            
            <h1>Top Sellers</h1>
            <div className='topsellers__list'>
            {productsList.map((product,index)=> (
                <ProductCard product={product} mode="block" />
                // <Link to={`/product/${product.id}`} key={product.id}>
                //     <ProductCard product={product} mode="block" />
                // </Link>     
            ))}        
            </div>
        </section>
        </>
    )
}