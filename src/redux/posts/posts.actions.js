import postActionTypes from './post.actionTypes'

export const setPost = (posts)=>({
    type: postActionTypes.SET_POST,
    payload: posts
})

export const toggleLike = ([postId,userId])=>({
    type: postActionTypes.TOGGLE_LIKE,
    payload: ([postId,userId])
})

export const addComment = ([comment, user, postId])=>({
    type: postActionTypes.ADD_COMMENT,
    payload:([comment,user,postId])
})