import axios from "axios";
const api= {
    baseUrl : "http://localhost:8080"
}

export async function getProductsList(){ 
    const URI=`${api.baseUrl}/products`;  
    try {          
        const response = await axios.get(`${URI}`);    
        return response.data;
    } catch (err) {
        console.log('Error when retrieving products list through api. try again pls');
        console.error(err);
    }
}

export async function getVideoDetail(videoId){ 
    const URI=`${api.baseUrl}/videos/${videoId}`;  
    try {
        const response = await axios.get(`${URI}`);
        return response.data;
    } catch (err) {
        console.log('Error when retrieving video detail in getVideoDetail. try again pls');
        console.error(err);
    }
}

export async function postComment(id,commentData){ 
    const URI=`${api.baseUrl}/videos/${id}/comments`;  
    try {          
        const response = await axios.post(`${URI}`,commentData);    
        return response.data;
    } catch (err) {
        console.log('error when retrieving video list in postComment. try again pls');
        console.error(err);
    }
}

export async function postVideo(newVideo){
    const URI=`${api.baseUrl}/videos`;  
    try {          
        const response = await axios.post(`${URI}`,newVideo);    
        return response.data;
    } catch (err) {
        console.log('error when posting video list in postVideo. try again pls');
        console.error(err);
    }
}