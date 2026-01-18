import { toast } from "sonner";
import { authEndpoint } from "../api"
import { apiConnector } from "../apiConnect";


const {SIGNUP, SIGNIN, ME} = authEndpoint;

interface SignupProp {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string
}

export const signupAuth = async ({firstName, lastName, email, password}: SignupProp) => {
    try{
        const resposne = await apiConnector("POST",SIGNUP ,{firstName, lastName, email, password});
        if(!resposne.data.success) toast.error("Error while signup, try again");
        return resposne?.status;
    }catch(error){
        console.log(error);
    }
}

export const signInAuth = async ({email, password}: SignupProp) => {
    try{
        const resposne = await apiConnector("POST",SIGNIN ,{email, password});
        if(!resposne.data.success) toast.error("Error while signin, try again");
        return resposne?.status;
    }catch(error){
        console.log(error);
    }
}

export const me = async () => {
    try{
        const response = await apiConnector("GET", ME);
        console.log("ME ROUTE", response);
        return response;
    }catch(error){
        console.log("Error ME ROUTE", error)
    }
}