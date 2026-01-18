import { useEffect } from "react"
import { fetchUserPost } from "../services/operations/post"
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../redux/slice/userPosts";
import type { RootState } from "../main";
import PostCard from "../components/common/PostCard";


const YourPosts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserPostData = async () => {
            const res = await fetchUserPost();
            dispatch(setUserPosts(res))
            console.log("RESS,", res);
        }
        fetchUserPostData();
    }, [dispatch]);

    const userPosts = useSelector((state: RootState) => state.userPostsState);
  return (
    <div className="w-full flex flex-col justify-center items-center  pt-36 gap-5">
       
        {
            userPosts && userPosts.map((el) => (
                <PostCard key={el._id} prop={el}/>
            ))
        }
    </div>
  )
}

export default YourPosts