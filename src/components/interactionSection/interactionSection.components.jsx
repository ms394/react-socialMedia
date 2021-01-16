import React from 'react'
import './interactionSection.styles.css'
import {connect} from 'react-redux'
import {toggleLike} from '../../redux/posts/posts.actions'
import {selectCurrentUser} from '../../redux/users/user.selector'
import {createStructuredSelector} from 'reselect'


class InteractionSection extends React.Component{
    
    handleClick = ()=>{
        const userId = this.props.currentUser.id
        const {toggleLike} = this.props
        toggleLike([this.props.post,userId, this.props.currentUser.displayName])
        
    }

    render(){
        const {post, id, currentUser} = this.props
        return(
            <div className="interactionSection" id={id}>
                <span className="icon">
                    <span className='val'>{(post.likes).length}</span>
                    <strong className={`like ${post.likes.includes(currentUser.id)?'isLiked':''}`} 
                            onClick={this.handleClick}
                        > 
                            Like
                    </strong>
                </span>
                <span className="icon"><span className='val'>{post.comments.length}</span><strong className="cmnt"> Comment</strong></span>
                <span className="icon"><strong className="share">Share</strong></span>
            </div>
        )
    }
}
        
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
  })

const mapDispatchToProps = (dispatch)=>({
        toggleLike: ([post, userId, displayName])=>dispatch(toggleLike([post, userId, displayName]))
        
    }
)
    
export default connect(mapStateToProps, mapDispatchToProps)(InteractionSection)
