import { combineReducers } from "redux";
import postSlice from "./slice/postSlice";
import userSlice from "./slice/userSlice";
import userPostsSlice from "./slice/userPosts";

const rootReducer = combineReducers({
    postsState: postSlice,
    userState: userSlice,
    userPostsState: userPostsSlice
})

export default rootReducer;