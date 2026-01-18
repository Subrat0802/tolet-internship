import { useRef, useState } from "react";
import Button from "../components/ui/Button";
import { me, signInAuth, signupAuth } from "../services/operations/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";

const Auth = () => {
  const [signup, setSignup] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordlRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dipatch = useDispatch();

  const authHandler = async () => {
    const email = emailRef.current?.value as string;
    const password = passwordlRef.current?.value as string;
    const firstName = firstNameRef.current?.value as string;
    const lastName = lastNameRef.current?.value as string;

    if(signup){
        const repsosne = await signupAuth({firstName, lastName, email, password});
        if(repsosne !== 200) return;
        toast.success("User Signup successfully");
        setSignup(prev => !prev);
    }else{
        const repsosne = await signInAuth({email, password});
        if(repsosne !== 200) return;

        const resp = await me();
        dipatch(setUser(resp?.data.user));
        toast.success("User Signin successfully");
        navigate("/profile/publicposts")
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full ">
      <p className="mb-5">{signup ? "Signup" : "Signin"}</p>
      <div className="flex flex-col justify-between gap-3 w-[30%]">
        {signup && (
          <input
            ref={firstNameRef}
            placeholder="Bob"
            className="placeholder:text-gray-300 p-2  border rounded-xl  border-gray-600"
          />
        )}
        {signup && (
          <input
            ref={lastNameRef}
            placeholder="Marle"
            className="placeholder:text-gray-300 p-2  border rounded-xl  border-gray-600"
          />
        )}
        <input
          ref={emailRef}
          placeholder="Email: exa@gmail.com"
          className="placeholder:text-gray-300 p-2  border rounded-xl  border-gray-600"
        />
        <input
          ref={passwordlRef}
          placeholder="password"
          className="placeholder:text-gray-300 p-2  border rounded-xl  border-gray-600"
        />
        <Button
          onClick={authHandler}
          text={signup ? "Signup" : "Signin"}
          style="primary"
        />
      </div>
      <div className="">
        <p
          onClick={() => setSignup((prev) => !prev)}
          className="mt-5 group cursor-pointer"
        >
          {signup ? "Already have an account?" : "Don't have account?"}{" "}
          <span className="group-hover:text-sky-700">
            {!signup ? "signup" : "signin"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
