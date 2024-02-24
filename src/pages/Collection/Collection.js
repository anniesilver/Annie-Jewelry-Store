
import './Collection.scss'
import {useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import {getProductsList,getProudctsByCollection,baseUrl} from '../../components/Util/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import Sorting from '../../components/Sorting/Sorting';

export default function Collection(){
    const criteria = ["Bestsellers","New Arrival","Price:Low to High","Price:High to Low"];
    const [selectedCriteria,setSelectedCriteria]=useState([criteria[0]]);
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

    function onSelect(option){
       
        const c_index = criteria.indexOf(option);
        if (c_index !== -1) {         
            criteria.unshift(criteria.splice(c_index, 1)[0]); // [0] is used to access the first element of the array returned by splice()
        }
       
        const sortedList = [...productsList];
        switch (option){
            case "Bestsellers":                
                sortedList.sort((a, b) => a.sold - b.sold);   
                setProductsList(sortedList);             
                break;
            case "Price:Low to High":                
                sortedList.sort((a, b) => a.price - b.price);
                setProductsList(sortedList);
                break;
            case "Price:High to Low":
                sortedList.sort((a, b) => b.price - a.price);
                setProductsList(sortedList);
                break;
            default:
                break;                
        }
    }
    return(
        <section className='collection'>
        <div className='collection__banner'>
            <img src={baseUrl+"/images/banner/collection_"+collection_id+".jpg"} alt=""></img>
        </div>
        <Sorting 
            criteria={criteria}
            onSelect={onSelect}
        />

        <div className='collection__products'>
            {productsList.map((product,index)=> (
                <ProductCard product={product} mode="block" />                
            ))}       
        </div>
        </section>
    )
}