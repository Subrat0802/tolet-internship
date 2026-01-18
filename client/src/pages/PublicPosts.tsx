import { useSelector } from 'react-redux';
import type { RootState } from '../main';
import PostCard from '../components/common/PostCard';

const PublicPosts = () => {
    const posts = useSelector((state: RootState) => state.postsState) ?? null;
  return (
    <div className="max-w-7xl mx-auto relative pt-32 mb-20 -z-20">
        <p className="mb-10 text-2xl fixed ">All Posts</p>
        <div className="w-full mx-auto gap-3 flex justify-center items-center flex-col-reverse">
            {
                posts && posts.map((el) => (
                    <PostCard key={el._id} prop={el}/>
                ))
            }
        </div>
    </div>
  )
}

export default PublicPosts