import axios from "axios";
const baseUrl = "http://localhost:8080";
export const productImageBaseUrl="http://localhost:8080/images/products/";


export async function getProductsList(){ 
    const URI=`${baseUrl}/products/li`;  
    try {          
        const response = await axios.get(`${URI}`);    
        return response.data;
    } catch (err) {
        console.log('Error when retrieving products list.  try again pls');
        console.error(err);
    }
}

export async function getTopSellers(limit){ 
    const URI=`${baseUrl}/products/ts/${limit}`;  
    try {
        const response = await axios.get(`${URI}`);
        return response.data;
    } catch (err) {
        console.log('Error when retrieving Top sellers. try again pls');
        console.error(err);
    }
}

export async function getProudctsByCategory(category_id){ 
    const URI=`${baseUrl}/products/ct/${category_id}`;  
    try {
        const response = await axios.get(`${URI}`);
        return response.data;
    } catch (err) {
        console.log('Error when retrieving Top sellers. try again pls');
        console.error(err);
    }
}

export async function getProudctsByCollection(collection_id){ 
    const URI=`${baseUrl}/products/cl/${collection_id}`;  
    try {
        const response = await axios.get(`${URI}`);
        return response.data;
    } catch (err) {
        console.log('Error when retrieving Top sellers. try again pls');
        console.error(err);
    }
}

export async function getProductDetail(productId){ 
    const URI=`${baseUrl}/products/${productId}`;  
    try {
        const response = await axios.get(`${URI}`);
        return response.data;
    } catch (err) {
        console.log('Error when retrieving product detail. try again pls');
        console.error(err);
    }
}

export async function postComment(id,commentData){ 
    const URI=`${baseUrl}/videos/${id}/comments`;  
    try {          
        const response = await axios.post(`${URI}`,commentData);    
        return response.data;
    } catch (err) {
        console.log('error when retrieving video list in postComment. try again pls');
        console.error(err);
    }
}

export async function postVideo(newVideo){
    const URI=`${baseUrl}/videos`;  
    try {          
        const response = await axios.post(`${URI}`,newVideo);    
        return response.data;
    } catch (err) {
        console.log('error when posting video list in postVideo. try again pls');
        console.error(err);
    }
}