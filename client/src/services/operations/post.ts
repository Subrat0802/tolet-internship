import { toast } from "sonner";
import { postEndpoint } from "../api"
import { apiConnector } from "../apiConnect";

// const {SIGNIN, SIGNUP, ME} = authEndpoint;
const { getAllPost } = postEndpoint;


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