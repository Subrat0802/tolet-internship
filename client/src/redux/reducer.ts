import { combineReducers } from "redux";
import postSlice from "./slice/postSlice";
import userSlice from "./slice/userSlice";
import userPostsSlice from "./slice/userPosts";
import uiSidebarSlice from "./slice/uiSlice";

const rootReducer = combineReducers({
    postsState: postSlice,
    userState: userSlice,
    userPostsState: userPostsSlice,
    sideBarState: uiSidebarSlice
})

export default rootReducer;