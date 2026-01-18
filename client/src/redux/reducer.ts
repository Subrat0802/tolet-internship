import { combineReducers } from "redux";
import postSlice from "./slice/postSlice";

const rootReducer = combineReducers({
    postsState: postSlice
})

export default rootReducer;