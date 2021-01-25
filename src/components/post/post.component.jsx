import React from 'react'
import './post.styles.css'
import { withRouter } from "react-router-dom";


const Post = (props)=>(
    
    <div className="post" onClick={()=>props.history.push(`post/${props.post.id}`)}>
        {props.post.imageUrl?(<img src={props.post.imageUrl}  width='100' height='100' alt="post"/>):null}
        <div className="caption">
            <h4 className="captionText">{props.post.post}</h4>
        </div>
    </div>
)

export default withRouter(Post)