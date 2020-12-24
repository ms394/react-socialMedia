import postActionTypes from './post.actionTypes'
import {addPostToState, addCommentToState} from './post.utils'
import {addLikeToPost, addCommentToPost} from '../../firebase/firebaseConfig'


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
            const [postId, userId] = action.payload
            addLikeToPost(postId,  userId) 
            return state
        case postActionTypes.ADD_COMMENT:
            const [comment,user, post_id] = action.payload
            addCommentToPost(comment,user, post_id)
            return state
        default: 
            return state
    }
}

export default postsReducer