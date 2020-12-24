import React from 'react'
import './postWrapper.styles.css'
import InteractionSection from '../interactionSection/interactionSection.components'
import CommentSection from '../commentsSection/commentsSection.component'
import Post from '../post/post.component'
import {getAllComments} from '../../firebase/firebaseConfig'
import {createStructuredSelector } from 'reselect'
import {connect} from 'react-redux'
import { selectAllPosts } from '../../redux/posts/posts.selector'
import { setPost } from '../../redux/posts/posts.actions'



class PostWrapper extends React.Component{

    constructor(){
        super()
        this.state={
            comment:"",
            allComments : []
        }
    }
    
    async componentDidMount(){
        const allComments = await getAllComments(this.props.post.id)
        allComments.onSnapshot(snapshot=>{
            const allComments = []
            snapshot.docs.forEach(comment=>{
                allComments.push({id: comment.id, ...comment.data()})
            })
            this.setState({allComments: [...allComments]})
        }
        )
    }

    render(){
        return(
            <div className="postWrapper" id={this.props.id}>
                <div className="postAuthor">
                    <img src={this.props.post.author.imageUrl} alt=""/>
                    <span>{this.props.post.author.displayName}</span>
                </div>
                <Post post={this.props.post}/>
                <InteractionSection id={this.props.id} post={this.props.post} comments={this.state.allComments}/>
                <CommentSection id={this.props.id} post={this.props.post} comments={this.state.allComments}/>
            </div>
        )
    }
} 

const mapDispatchToProps = (dispatch)=>({
    setPost: (posts)=>dispatch(setPost(posts))
})

const mapStateToProps = createStructuredSelector({
    allPosts: selectAllPosts,
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PostWrapper)

