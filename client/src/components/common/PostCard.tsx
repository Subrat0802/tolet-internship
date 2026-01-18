export interface propData {
    _id: string,
    title: string,
    content: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
    user: string
}

interface propIns {
    prop: propData
}

const PostCard = ( {prop} : propIns) => {
  return (
    <div className="w-[30%] p-4 bg-gray-100/80 shadow-2xl rounded-2xl">
      {prop.imageUrl && (
        <img className="w-full h-44 " src={prop.imageUrl} loading="lazy" />
      )}
      <p className="text-2xl font-semibold mb-3">{prop.title}</p>
      <p className="wrap-break-word">{prop.content}</p>
      <p className="wrap-break-word">{prop.createdAt.toString()}</p>
    </div>
  );
};

export default PostCard;
