import React from 'react'
import { useParams } from 'react-router-dom'

function PostDetailsPage() {
    let {postId} = useParams()
    return (
        <div>
            <h1>Post Details page : {postId}</h1>
        </div>
    )
}

export default PostDetailsPage