import React from 'react'
import './commentsSection.styles.css'
import {connect} from 'react-redux'
import {addComment} from '../../redux/posts/posts.actions'
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../../redux/users/user.selector'

class CommentSection extends React.Component{

    constructor(){
        super()
        this.state ={
            comment:''
        }
    }

   

    handleChange =(e)=>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit =(e)=>{
        e.preventDefault()
        const {comment} = this.state
        const {post, addComment, currentUser} = this.props
        addComment([comment,currentUser, post ])
        this.setState({
            comment: ''
        })
    }

   

    render(){
        const comments = this.props.post.comments
        return( 
            <div className="commentSection">
                {comments.length>0?(
                    comments.slice(comments.length-2, comments.length).map((comment, index)=>(
                        <div className="commentWrapper" key={index}>
                            <div className="avatar">
                                <img src={comment.user.imageUrl} alt=""/>
                            </div>
                            <div className="comment"><p>{comment.comment}</p></div>
                        </div>
                    ))
                    
                ):(<p className='noCommentsMsg'>There are no comments yet!!</p>)}
                <div className="usercomment">
                    <div className="commentWrapper">
                        <div className="avatar">
                            <img src={this.props.currentUser.imageUrl} alt=""/>
                        </div>
                        <div className="comment">
                            <input type="text" value = {this.state.comment} name="comment" onChange={this.handleChange} placeholder="Enter Comment..." /><br/>  
                            {this.state.comment?<button type="submit" onClick={this.handleSubmit}>Comment</button>: null}
                        </div>
                    </div>
                </div>   
            </div>
        )
        
    }
} 



const mapDispatchToProps = (dispatch)=>({
        addComment: ([comment,userId, postId])=>dispatch(addComment([comment,userId, postId]))
})

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps, mapDispatchToProps)(CommentSection)
