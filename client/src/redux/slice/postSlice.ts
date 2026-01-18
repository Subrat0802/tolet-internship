import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface postsData {
    _id: string,
    title: string,
    content: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
    user: string
}


const initialState: postsData[] = [];

const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers: {
        setPosts(_state, action: PayloadAction<postsData[]>) {
            return action.payload
        }
    }
})

export const {setPosts} = postsSlice.actions;
export default postsSlice.reducer;

