import { ArrowBigLeftDashIcon } from "lucide-react"
import Button from "../ui/Button"
import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="w-full bg-neutral-50 shadow-md py-4 top-0 fixed">
        <div className="max-w-7xl  mx-auto flex justify-between ">
            <div className="flex justify-center items-center ">
                <div className="bg-linear-to-r  from-white via-sky-300 to-sky-700 p-1 text-xl text-black rounded-xl  font-bold"><ArrowBigLeftDashIcon width={20}/></div>
                <p className="font-bold text-2xl font-stretch-50%">Post</p>
            </div>
            <div className="gap-3 flex justify-center items-center">

                <Link to="auth"><Button text="Signin" style="primary"/></Link>
            </div>
        </div>
        
    </div>
  )
}

export default Header