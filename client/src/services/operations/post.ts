import { toast } from "sonner";
import { postEndpoint } from "../api"
import { apiConnector } from "../apiConnect";

const { getAllPost, getUserAllPost, createPost, updatePost, deletePost } = postEndpoint;



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


export const createUserPost = async ({title, content, image}:{title: string, content:string, image: string}) => {
    console.log(content);
    try{
        const resposne = await apiConnector("POST", createPost, {title, content, image})
        console.log(resposne);
        if(!resposne.data.success) toast.error("Something went wrong while Fething the user all posts");
        return resposne.data.data
        
    }catch(error){
        console.log(error);
        toast.error("Server Erorr while fetching all user posts")
    }
}

export const deleteUserPost = async (postId: string) => {
    try{
        const response = await apiConnector("POST", `${deletePost}/${postId}`)
        if(!response.data.success) toast.error("Something went wrong while deleting the post");
        toast.success("Post deleted successfully");
        return response.data
        
    }catch(error){
        console.log(error);
        toast.error("Server Error while deleting post")
    }
}

export const updateUserPost = async (postId: string, content: string) => {
    try{
        const response = await apiConnector("PUT", `${updatePost}/${postId}`, {content})
        if(!response.data.success) toast.error("Something went wrong while updating the post");
        toast.success("Post updated successfully");
        return response.data.data
        
    }catch(error){
        console.log(error);
        toast.error("Server Error while updating post")
    }
}