import { useState } from "react";
import {
  Edit2Icon,
  Trash,
  Check,
  X,
} from "lucide-react";
import { deleteUserPost, updateUserPost } from "../../services/operations/post";
import { useDispatch } from "react-redux";
import { fetchUserPost } from "../../services/operations/post";
import { setUserPosts } from "../../redux/slice/userPosts";

export interface propData {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}

interface propIns {
  prop: propData;
  post?: boolean;
}

const PostCard = ({ prop, post }: propIns) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(prop.content);
  const dispatch = useDispatch();

  const handleRemove = async () => {
    await deleteUserPost(prop._id);
    const res = await fetchUserPost();
    dispatch(setUserPosts(res));
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(prop.content);
  }

  const handleSave = async () => {
    await updateUserPost(prop._id, editedContent);
    setIsEditing(false);
    const res = await fetchUserPost();
    dispatch(setUserPosts(res));
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(prop.content);
  }

  return (
    <div className="w-[40%] p-4 bg-gray-100/80 shadow-xl rounded-2xl hover:scale-105 transition-all duration-200">
      {prop.imageUrl && (
        <img className="w-full h rounded-t-xl" src={prop.imageUrl} loading="lazy" />
      )}
      <p className="text-2xl font-semibold mb-3">{prop.title}</p>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="wrap-break-word p-2 border rounded-xl border-gray-600 w-full"
            rows={4}
          />
          <div className="flex gap-2">
            <div onClick={handleSave} className="flex justify-center items-center gap-1 hover:text-green-700 transition-all duration-200 cursor-pointer">
              <Check size={17} />
              <p>Save</p>
            </div>
            <div onClick={handleCancel} className="flex justify-center items-center gap-1 hover:text-gray-700 transition-all duration-200 cursor-pointer">
              <X size={17} />
              <p>Cancel</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="wrap-break-word">{prop.content}</p>
      )}
      <p className="wrap-break-word text-xs my-4">{new Date(prop.createdAt).toLocaleString()}</p>
      {post && !isEditing && (
        <div className="flex justify-between mt-3 gap-2">
          <div onClick={handleEdit} className="flex justify-center items-center gap-1 hover:text-sky-700 transition-all duration-200 cursor-pointer">
            <Edit2Icon size={17} />{" "}
            <p className="">
              Edit
            </p>
          </div>
          <div onClick={handleRemove} className="flex justify-center items-center gap-1 hover:text-red-700 transition-all duration-200 cursor-pointer">
            <Trash size={17} />{" "}
            <p className="">
              Remove
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
