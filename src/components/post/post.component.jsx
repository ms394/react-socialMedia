import React from 'react'
import './post.styles.css'



const Post = (props)=>(
    
    <div className="post">
        {props.post.imageUrl?(<img src={props.post.imageUrl}  width='100' height='100' alt="post"/>):null}
        {/* {console.log(props)} */}
        <div className="caption">
            <h4 className="captionText">{props.post.post}</h4>
        </div>
    </div>
)

export default Post