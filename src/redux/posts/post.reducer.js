import postActionTypes from './post.actionTypes'
import {addCommentsToState} from './post.utils'
import {addLikeToPost, addCommentToPost, addActivity} from '../../firebase/firebaseConfig'


const INITITAL_STATE = {
    allPosts : []
}

const postsReducer = (state=INITITAL_STATE, action)=>{
    switch(action.type){
        case postActionTypes.SET_POST:
            return {
                ...state,
                allPosts : action.payload
            }
        
        case postActionTypes.TOGGLE_LIKE:
            const [postId, userId, displayName] = action.payload
            addLikeToPost(postId,  userId, displayName) 
            return state
        
        case postActionTypes.ADD_ACTIVITY:
            const [post, user_Id, activity] = action.payload
            addActivity(post, user_Id, activity)
            return state        
        
        case postActionTypes.ADD_COMMENT:
            const [comment,user, post_id] = action.payload
            addCommentToPost(comment,user, post_id)
            return state
        
        case postActionTypes.ADD_COMMENT_TO_STATE:
            const posts  = addCommentsToState(state.allPosts)
            return {
                ...state,
                allPosts : posts
            }
        default: 
            return state
    }
}

export default postsReducer