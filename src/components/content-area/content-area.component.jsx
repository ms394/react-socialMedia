import React from 'react'
import './content-area.styles.css'
import PostWrapper from '../postWrapper/postWrapper.component'
import CreatePost from '../createPost/createPost.component'
import {connect} from 'react-redux'
import {createStructuredSelector}  from 'reselect'
import {selectAllPosts} from '../../redux/posts/posts.selector'
import {setPost} from '../../redux/posts/posts.actions'
import {getAllPost, getAllComments} from '../../firebase/firebaseConfig'

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
    setPosts : (posts)=>dispatch(setPost(posts))
})

const mapStateToProps = state=>({
    posts: state.posts.allPosts
})

export default connect(mapStateToProps,mapDispatchToProps)(ContentArea)