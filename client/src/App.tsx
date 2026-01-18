import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import { useEffect } from "react";
import { fetchAllPost } from "./services/operations/post";
import { useDispatch } from "react-redux";
import { setPosts } from "./redux/slice/postSlice";
import { me } from "./services/operations/auth";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await me();
      console.log("AAPPAPuser", user);
      if (!user) return;
      sessionStorage.setItem("user", JSON.stringify(user.data?.user));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // dispatch(setUser())
    const fetchAllPosts = async () => {
      const resposne = await fetchAllPost();
      console.log("RESPONSE", resposne);
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
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
