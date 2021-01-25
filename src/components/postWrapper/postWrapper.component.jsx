import React from 'react'
import './postWrapper.styles.css'
import InteractionSection from '../interactionSection/interactionSection.components'
import CommentSection from '../commentsSection/commentsSection.component'
import Post from '../post/post.component'
import {getAllComments} from '../../firebase/firebaseConfig'
import {createStructuredSelector } from 'reselect'
import {connect} from 'react-redux'
import { selectAllPosts } from '../../redux/posts/posts.selector'
import { setPost, addCommentsToState} from '../../redux/posts/posts.actions'
import { withRouter } from "react-router-dom";


class PostWrapper extends React.Component{

    constructor(){
        super()
        this.state={
            comment:"",
            allComments : []
        }
    }
    
    render(){
        const {history, id, post} = this.props
        return(
            <div className="postWrapper" id={id}>
                <div className="postAuthor" onClick={()=>history.push(`post/${id}`)}>
                    <img src={post.author.imageUrl} alt=""/>
                    <span>{post.author.displayName}</span>
                </div>
                <Post post={post} />
                <InteractionSection id={id} post={post} comments={this.state.allComments}/>
                <CommentSection id={id} post={post}/>
            </div>
        )
    }
} 

const mapDispatchToProps = (dispatch)=>({
    setPost: (posts)=>dispatch(setPost(posts)),
    addComments: ()=>dispatch(addCommentsToState())
})

const mapStateToProps = createStructuredSelector({
    allPosts: selectAllPosts,
    
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostWrapper))

