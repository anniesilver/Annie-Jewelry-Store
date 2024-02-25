import './CommentSection.scss';
import "../../styles/global.scss";
import { useEffect, useState} from "react";
import {postComment,getProfile} from "../../components/Util/api.js";
import CommentList from '../CommentList/CommentList.js';


export default function CommentSection({currentProduct}){       
    const {id,comments}=currentProduct; 
    const [commentList, setCommentList] = useState(comments);   
    const [decodeUser,setDecodedUser]=useState();  
    useEffect(() => {
        setCommentList(comments);
    }, [comments]);
    useEffect(() => {
        const getUser = async ()=>{
            const decodeUser= await getProfile();
            if(decodeUser){
                //setUserInfo(decodeUser); 
            }     
        }
        getUser();   
    }, []);
    
    function submitHandler(e){   
        e.preventDefault(); 
        if(e.target.comment.value === ""){       
            if(!e.target.comment.classList.contains("comment__textarea--alert")){
                e.target.comment.classList.toggle("comment__textarea--alert");                
            }      
            e.target.comment.placeholder="write something here..." ;
        }
        else{         
            try{   
                async function postData() {  
                    const commentData={user_id:decodeUser.user_id,comment:e.target.comment.value};        
                    const newComment = await postComment(id,commentData);                                 
                    setCommentList((commentList) =>[...commentList,newComment]);   
                }
                postData();
               
                if(e.target.comment.classList.contains("comment__textarea--alert")){
                    e.target.comment.classList.toggle("comment__textarea--alert");                
                } 
                e.target.comment.value="" ;                
            }catch(e){
                console.error(e);
            }                                               
        }        
    }
    function focusHandler(e){           
        e.target.classList.toggle("comment__textarea--focus");      
    }
    function blurHandler(e){          
        e.target.classList.toggle("comment__textarea--focus");
    }

    return(
    <div className="comment">   
        <h3>Reviews</h3>    
        <form id={id} onSubmit={submitHandler}>     
            <div className="comment__form">                          
                <div className="comment__input">
                    <textarea className="comment__textarea" name="comment" placeholder="Add a new comment" onFocus={focusHandler} onBlur={blurHandler}></textarea>                                         
                </div>   
                <button type="submit">Add Comment</button>   
            </div>      
        </form> 
        <CommentList commentList={commentList} />  
    </div>
    )
}
