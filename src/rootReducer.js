import userReducer from './redux/users/users.reducer'
import { combineReducers } from "redux";
import postsReducer from './redux/posts/post.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer
})

export default rootReducer