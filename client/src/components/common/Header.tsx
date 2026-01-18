import { ArrowBigLeftDashIcon } from "lucide-react"
import Button from "../ui/Button"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../main";
import { clearUser } from "../../redux/slice/userSlice";
import { toast } from "sonner";


const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userState);


    const handleLogout = () => {
        dispatch(clearUser())
        sessionStorage.setItem("user", "");
        toast.success("User logged out!")
    }

  return (
    <div className="w-full bg-neutral-50 shadow-md py-4 top-0 fixed z-40">
        <div className="max-w-7xl  mx-auto flex justify-between ">
            <Link to={"/"}><div className="flex justify-center items-center ">
                <div className="bg-linear-to-r  from-white via-sky-300 to-sky-700 p-1 text-xl text-black rounded-xl  font-bold"><ArrowBigLeftDashIcon width={20}/></div>
                <p className="font-bold text-2xl font-stretch-50%">Post</p>
            </div></Link>
            <div className="gap-3 flex justify-center items-center">


                {user ? <div className="flex gap-4">
                    <Link to={"/profile/publicposts"}><Button text="Public Posts" style="secondary"/></Link>
                    <Link to={"/profile/userposts"}><Button text="Your Posts" style="secondary"/></Link>
                    <Button onClick={handleLogout} text="logout" style="primary"/>
                </div> : <Link to="auth"><Button text="Signin" style="primary"/></Link>}
            </div>
        </div>
        
    </div>
  )
}

export default Header