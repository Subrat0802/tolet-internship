import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import { useEffect } from "react";
import { fetchAllPost } from "./services/operations/post";
import { useDispatch } from "react-redux";
import { setPosts } from "./redux/slice/postSlice";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Profile from "./pages/Profile";
import { me } from "./services/operations/auth";
import { clearUser, setUser } from "./redux/slice/userSlice";
import PublicPosts from "./pages/PublicPosts";
import YourPosts from "./pages/YourPosts";

function App() {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      if(!sessionStorage.getItem("user")) return;
      const res = await me();
      const userData = res?.data;
      dispatch(setUser(userData));
    } catch {
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // dispatch(setUser())
    const fetchAllPosts = async () => {
      const resposne = await fetchAllPost();
      // console.log("RESPONSE", resposne);
      dispatch(setPosts(resposne));
    };

    fetchAllPosts();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} >
            <Route path="publicposts" element={<PublicPosts />}/>
            <Route path="userposts" element={<YourPosts />}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
