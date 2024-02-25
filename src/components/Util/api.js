import axios from "axios";
export const baseUrl = "http://localhost:8080";
export const productImageBaseUrl="http://localhost:8080/images/products/";
export const PAYPAL_CLIENT_ID = 'ASrSf2BqxbJrKbOSEgVCGLqv_EBsnn_r2tRhW7okcHFAhvB4zz_VgqGrFmIQX5bf0VN0fxpLYxNOo9iV';


export async function searchProducts(keywords){ 
    const URI=`${baseUrl}/search`;  
    try {          
        console.log("========== keywords list",keywords);
        const response = await axios.get(`${URI}`,{
            params: {
                keywords: keywords                
                // Add more parameters as needed
              }            
        });    

        
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log('Error when searching products.  try again pls');
        console.error(err);
    }
}
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

export async function getProudctsByCollection(collection_id){ 
    const URI=`${baseUrl}/products/cl/${collection_id}`;  
    try {
        const response = await axios.get(`${URI}`);
        return response.data;
    } catch (err) {
        console.log('Error when retrieving product by collection. try again pls');
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

export async function postComment(product_id,commentData){ 
    const URI=`${baseUrl}/products/${product_id}/comments`;  
    try {          
        const response = await axios.post(`${URI}`,commentData);    
        return response.data;
    } catch (err) {
        console.error('error when submit the comment.', err);
    }
}
  
export async function getComments(){ 
    try {
        const commentsData = await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`);      
        const sortedData = commentsData.data.sort(function (a, b) {
            return b.timestamp - a.timestamp;
          });       
        return sortedData;
    } catch (err) {
        console.log('oops, error when retrieving comments data. try again pls');
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