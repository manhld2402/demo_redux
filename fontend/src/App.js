import "./App.css";
import HomePage from "./components/page/HomePage";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";
import PostPage from "./components/page/PostPage";
import BoxSignup from "./components/layout/BoxSignup";
import BoxLogin from "./components/layout/BoxLogin";
import DetailPage from "./components/page/DetailPage";
import Profile from "./components/page/Profile";
import EditUserPage from "./components/page/EditUserPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<PostPage />} />
        <Route path="/login" element={<BoxLogin />} />
        <Route path="/signup" element={<BoxSignup />} />
        <Route path="/pin/:id" element={<DetailPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Routes>
    </div>
  );
}

export default App;
