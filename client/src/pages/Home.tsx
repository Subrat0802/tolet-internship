
import { useSelector } from "react-redux"
import type { RootState } from "../main"

const Home = () => {
    const posts = useSelector((state: RootState) => state.postsState) ?? null;
  return (
    <div className="max-w-7xl mx-auto pt-32 mb-20">
        <p className="mb-10 text-2xl ">All Posts</p>
        <div className="w-full mx-auto gap-3 flex justify-center items-center flex-col-reverse">
            {
                posts && posts.map((el) => (
                    <div className="w-[30%] p-4 bg-gray-100/80 shadow-2xl rounded-2xl" key={el._id}>
                        {el.imageUrl && <img className="w-full h-44 " src={el.imageUrl} loading="lazy" />}
                        <p className="text-2xl font-semibold mb-3">{el.title}</p>
                        <p className="wrap-break-word">{el.content}</p>
                        <p className="wrap-break-word">{el.createdAt.toString()}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home