import './Search.scss'
import {useState,useEffect} from 'react';
import {searchProducts} from '../../components/Util/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useCart} from '../../components/CartProvider/CartProvider';
import Sorting from '../../components/Sorting/Sorting';

export default function Search(){
    const criteria = ["Bestsellers","New Arrival","Price:Low to High","Price:High to Low"];
    const [selectedCriteria,setSelectedCriteria]=useState([criteria[0]]);
    const [productsList,setProductsList]=useState([]);

    const {searchKeywords} = useCart();    
    
    useEffect(() => {  
        const  fetchData = async ()=>{ 
                try{  
                    const list = await searchProducts(searchKeywords); 
                    if(list){
                        setProductsList(list);
                    }
                    else{
                        return (<h2>No product found with those searchKeywords</h2>)
                    }                
                }  
                catch(e){
                    console.error("Error in fetchData when searching products",e);
                }           
        }
        fetchData();
    }, [searchKeywords]); 

    function onSelect(option){       
        const c_index = criteria.indexOf(option);
        if (c_index !== -1) {      
            criteria.unshift(criteria.splice(c_index, 1)[0]); 

        }       
        const sortedList = [...productsList];
        switch (option){
            case "Bestsellers":                
                sortedList.sort((a, b) => b.sold - a.sold);   
                setProductsList(sortedList);             
                break;
            case "New Arrival":                
                sortedList.sort((a, b) => a.id - b.id);
                setProductsList(sortedList);
                break;
            case "Price:High to Low":
                sortedList.sort((a, b) => b.price - a.price);
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
        <section className='search'>
        <h1>Search Result</h1>
        <Sorting 
            criteria={criteria}
            onSelect={onSelect}
        />

        <div className='search__products'>
            {productsList.map((product,index)=> (
                <ProductCard product={product} mode="block" />                
            ))}       
        </div>
        </section>
    )
}