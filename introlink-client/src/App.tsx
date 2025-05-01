import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import Forum from "./pages/Forum";
import ForumCategoryPage from "./components/ForumCategory";
import ThreadPage from "./components/ThreadPage";
import CreateThread from "./components/CreateThread";
import ReplyBox from "./components/ReplyBox";
import ThreadCard from "./components/ThreadCard";

function App() {

const shashank = {
  
    id: "user1",
    name: "John Doe",
    avatar: "https://via.placeholder.com/150"
  
}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/forum" element={<Forum/>} />
        <Route path="/forum/:category" element={<ForumCategoryPage />} />
        <Route path="/thread" element={<ThreadPage/>} />
        <Route path="/createthread" element={<CreateThread/>} />
        <Route path="/reply" element={<ReplyBox threadId={12}/>} />
        <Route path="/card" element={<ThreadCard id="123" title="Shashank" body="Hey My Name is shashak Gavale i developed this introloink use it and enjoy it" replyCount={12} upvotes={25} createdAt={new Date() } user={shashank}/>} />
      </Routes>
    </Router>
  );
}

export default App;
