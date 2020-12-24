import React from 'react'
import './interactionSection.styles.css'
import {connect} from 'react-redux'
import {toggleLike} from '../../redux/posts/posts.actions'
import {selectCurrentUser} from '../../redux/users/user.selector'
import {createStructuredSelector} from 'reselect'

class InteractionSection extends React.Component{

    handleClick = ()=>{
        const userId = this.props.currentUser.id
        const postId = this.props.id
        console.log(postId);
        const {toggleLike} = this.props
        toggleLike([postId,userId])
    }

    render(){
        return(
            <div className="interactionSection" id={this.props.id}>
                <span className="icon">
                    <span className='val'>{(this.props.post.likes).length}</span>
                    <strong className={`like ${this.props.post.likes.includes(this.props.currentUser.id)?'isLiked':''}`} onClick={this.handleClick}> Like</strong>
                </span>
                <span className="icon"><span className='val'>{this.props.comments.length}</span><strong className="cmnt"> Comment</strong></span>
                <span className="icon"><strong className="share">Share</strong></span>
            </div>
        )
    }
}
        
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
  })

const mapDispatchToProps = (dispatch)=>({
        toggleLike: ([postId, userId])=>dispatch(toggleLike([postId, userId]))
    }
)
    
export default connect(mapStateToProps, mapDispatchToProps)(InteractionSection)
