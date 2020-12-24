import {createSelector} from 'reselect'

const selectPostsState = state=>state.posts

export const selectAllPosts = createSelector(
    [selectPostsState],
    posts=>{
        
        return posts.allPosts
    }
)
