import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface UserPosts {
    _id: string,
    title: string,
    content: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
    user: string
}
const initialState: UserPosts[] = [];

const userPostsSlice = createSlice({
    name:"posts",
    initialState,
    reducers: {
        setUserPosts(_state, action: PayloadAction<UserPosts[]>) {
            return action.payload
        }
    }
})

export const {setUserPosts} = userPostsSlice.actions;
export default userPostsSlice.reducer;

