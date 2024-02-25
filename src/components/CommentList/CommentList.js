import '../../styles/global.scss'
import {covertToDate} from '../Util/util'


export default function CommentList({commentList}){
     const timeDescendSortComments= commentList.sort((a,b)=>{
        return b.timestamp - a.timestamp;
     })
     return (
        <div className="comment__list">      
            <hr></hr>
            {timeDescendSortComments.map((comment,index)=> (                
                <div key={index} className="comment__item">        
                    <div className="comment__content">
                        <div className="comment__content--header">
                            <h3 className="label-bold"> {comment.name}</h3>
                            <label className="label">{covertToDate(comment.timestamp)}</label>
                        </div>      
                        <div className="comment__content--comment">
                            <p>{comment.comment}</p>
                        </div>
                    </div>              
                </div>                      
            ))}
        </div>    
    )
}   