//import banner_1 from '../../assets/images/banner1.jpg';
import './Collection.scss'
import {useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import {getProductsList,getProudctsByCollection} from '../../components/Util/api';
import ProductCard from '../../components/ProductCard/ProductCard';
export default function Collection(){
    const [productsList,setProductsList]=useState([]);
    const {id} = useParams();
    const collection_id=parseInt(id);

    useEffect(() => {  
        const  fetchData = async ()=>{    
            
            if(collection_id <0){
                return(
                    <h2>Wrong Collecton Id you are trying to get</h2>
                );
            }
            if(collection_id === 0)
            {
                try{
                    const list = await getProductsList(); 
                    if(list){
                        setProductsList(list);
                    }
                    else{
                        return (<h2>No product available now</h2>)
                    }                
                }  
                catch(e){
                    console.error("Error in fetchData when Loading App",e);
                }
            }
            else{
                try{
                    const list = await getProudctsByCollection(collection_id); 
                    if(list){
                        setProductsList(list);
                    }
                    else{
                        return (<h2>No product available now</h2>)
                    }      
                }  
                catch(e){
                    console.error("Error in fetchData when Loading App",e);
                }
            }            
        }
        fetchData();
    }, [collection_id]); 
    return(
        <div className='collection'>
            {productsList.map((product,index)=> (
                <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductCard product={product} mode="block" />
                </Link>     
            ))}       
        </div>
    )
}