import { toast } from "sonner";
import { postEndpoint } from "../api"
import { apiConnector } from "../apiConnect";

// const {SIGNIN, SIGNUP, ME} = authEndpoint;
const { getAllPost, getUserAllPost } = postEndpoint; // createPost, updatePost, getPostById, deletePost,



export const fetchAllPost = async () => {
    try{
        const resposne = await apiConnector("GET", getAllPost)
        if(!resposne.data.success) toast.error("Something went wrong while Fething the all posts");
        return resposne.data.posts
        
    }catch(error){
        console.log(error);
        toast.error("Server Erorr while fetching all posts")
    }
}



export const fetchUserPost = async () => {
    try{
        const resposne = await apiConnector("GET", getUserAllPost)
        console.log(resposne);
        if(!resposne.data.success) toast.error("Something went wrong while Fething the user all posts");
        return resposne.data.data
        
    }catch(error){
        console.log(error);
        toast.error("Server Erorr while fetching all user posts")
    }
}