import { useEffect, useRef } from "react";
import { createUserPost, fetchUserPost } from "../services/operations/post";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../redux/slice/userPosts";
import type { RootState } from "../main";
import PostCard from "../components/common/PostCard";
import Button from "../components/ui/Button";
import { toggleSidebar } from "../redux/slice/uiSlice";

const YourPosts = () => {
  const dispatch = useDispatch();

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserPostData = async () => {
      const res = await fetchUserPost();
      dispatch(setUserPosts(res));
      console.log("RESS,", res);
    };
    fetchUserPostData();
  }, [dispatch]);

  const showSideBar = useSelector((state: RootState) => state.sideBarState.sidebar)

  const userPosts = useSelector((state: RootState) => state.userPostsState);

  const handlePost = async () => {
    const title = titleRef.current?.value;
    const content = descRef.current?.value;
    const image = imageRef.current?.value ?? ""

    if(!title || !content){
        return
    }

    const resposne = await createUserPost({title, content, image});
    console.log("resposne", resposne);
    if(titleRef.current) titleRef.current.value = "";
    if(descRef.current) descRef.current.value = "";
    if(imageRef.current) imageRef.current.value = "";
    dispatch(toggleSidebar());
    const res = await fetchUserPost();
    dispatch(setUserPosts(res));
  };



  const handleSidebarToggle = () => {
        dispatch(toggleSidebar())
    }


  return (
    <div className="w-full relative flex flex-col  justify-center items-center pb-30  pt-30 gap-8">
        <span className="cursor-pointer fixed bottom-3 left-3 p-3 bg-sky-600 text-white font-semibold" onClick={handleSidebarToggle}>Create post</span>
      
      <div
        className={`fixed  flex flex-col pt-50 items-center right-0 top-0 h-screen bg-gray-50 w-full md:w-[30%] transfor transition-transform duration-300 ease-in-out
         ${showSideBar ? "translate-x-0" : "translate-x-full"}`}>
                   
        <div className="flex flex-col w-full px-8 gap-2">
          <input
            ref={titleRef}
            placeholder="Title"
            className="placeholder:text-gray-300 p-2  border rounded-xl w-full  border-gray-600"
          />
          <input
            ref={descRef}
            placeholder="Description"
            className="placeholder:text-gray-300 p-2  border rounded-xl w-full border-gray-600"
          />
          <input
            ref={imageRef}
            placeholder="ImageURL"
            className="placeholder:text-gray-300 p-2 mb-3  border rounded-xl w-full border-gray-600"
          />
          <Button onClick={handlePost} text="Submit" style="primary" />
        </div>
      </div> 
      {userPosts &&
        userPosts.map((el) => <PostCard key={el._id} prop={el} post={true} />)}
    </div>
  );
};

export default YourPosts;
