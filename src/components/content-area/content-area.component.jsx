import React from 'react'
import './content-area.styles.css'
import PostWrapper from '../postWrapper/postWrapper.component'
import CreatePost from '../createPost/createPost.component'
import {connect} from 'react-redux'
import { setPost, addCommentsToState} from '../../redux/posts/posts.actions'


class ContentArea extends React.Component{
    
    render(){
        const {posts} = this.props
        
        return(
            <div className="contentArea">
                <CreatePost/>
                {posts.map(post=>{
                    return (<PostWrapper post={post} id={post.id} key={post.id}/>)
                })}
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>({
    setPosts : (posts)=>dispatch(setPost(posts)),
    addComments: ()=>dispatch(addCommentsToState())
})

const mapStateToProps = state=>({
    posts: state.posts.allPosts
})

export default connect(mapStateToProps,mapDispatchToProps)(ContentArea)