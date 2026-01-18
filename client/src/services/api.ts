const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const authEndpoint = {
    SIGNUP: BASE_URL + "/api/v1/auth/signup",
    SIGNIN: BASE_URL + "/api/v1/auth/signin",
    ME: BASE_URL + "/api/v1/auth/me",
} 

export const postEndpoint = {
    createPost: BASE_URL + "/api/v1/post/createPost",
    getAllPost: BASE_URL + "/api/v1/post/getAllPost",
    updatePost: BASE_URL + "/api/v1/post/updatePost",
    getPostById: BASE_URL + "/api/v1/post/getPostById",
    deletePost: BASE_URL + "/api/v1/post/deletePost",
} 

