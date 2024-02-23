import axios from "axios";
export const baseUrl = "http://192.168.0.155:8080";
export const productImageBaseUrl="http://192.168.0.155:8080/images/products/";


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
    const URI=`${baseUrl}/products/${id}/comments`;  
    try {          
        const response = await axios.post(`${URI}`,commentData);    
        return response.data;
    } catch (err) {
        console.log('error when retrieving video list in postComment. try again pls');
        console.error(err);
    }
}

export async function apiSignup(user){ 
    const URI=`${baseUrl}/users/signup`;  
    try {          
        const response = await axios.post(`${URI}`,user);    
        return response.data;
    } catch (err) {
        console.log('error when signup. try again pls');
        console.error(err);
    }
}

export async function apiLogin(user){ 
    const URI=`${baseUrl}/users/login`;  
    try {          
        const response = await axios.post(`${URI}`,user);    
        return response.data;
    } catch (err) {
        console.log('error when login. try again pls');
        console.error(err);
    }
}

export async function getProfile(){ 
    const URI=`${baseUrl}/users/profile`;  
    const token = sessionStorage.getItem("authToken");
    if(token){
        const authHeader =  {
            headers:{
              Authorization :`Bearer ${token}`,
            },
        }
        try {          
            const response = await axios.get(`${URI}`,authHeader);    
            if(response.status === 403){
                return null;
            }
            else{
                return response.data;
            }
            
        } catch (err) {
            console.log('error when verify usser auth. try again pls');
            console.error(err);
            return null;
        }
    }
    else{
        return null;
    }    
}