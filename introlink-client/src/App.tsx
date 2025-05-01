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
import JournalHomePage from "./components/JournalHomePage";
import CreateJournalEntry from "./components/CreateJournalEntry";
import ViewJournalEntry from "./components/ViewJournalEntry";
import EditJournalEntry from "./components/EditJournalEntry";
import JournalCard from "./components/JournalCard";
import TagFilter from "./components/TagFilter";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./components/EditProfile";
import AccountSettings from "./components/AccountSettings";
import PrivacyPreferences from "./components/PrivacyPreferences";
import AvatarUploader from "./components/AvatarUploader";

function App() {
  const shashank = {
    id: "user1",
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:category" element={<ForumCategoryPage />} />
        <Route path="/thread" element={<ThreadPage />} />
        <Route path="/createthread" element={<CreateThread />} />
        <Route path="/reply" element={<ReplyBox threadId={12} />} />
        <Route
          path="/card"
          element={
            <ThreadCard
              id="123"
              title="Shashank"
              body="Hey My Name is shashak Gavale i developed this introloink use it and enjoy it"
              replyCount={12}
              upvotes={25}
              createdAt={new Date()}
              user={shashank}
            />
          }
        />
        <Route path="/journal" element={<JournalHomePage />} />
        <Route path="/createJournal" element={<CreateJournalEntry />} />
        <Route path="/viewentry" element={<ViewJournalEntry />} />
        <Route path="/editentry" element={<EditJournalEntry />} />
        <Route
          path="/filter"
          element={
            <TagFilter
              tags={["health", "goals", "work"]}
              selectedTags={["health"]}
              onTagSelect={(tag) => console.log("Selected:", tag)}
              onTagDeselect={(tag) => console.log("Deselected:", tag)}
              onClearAll={() => console.log("Cleared all")}
              variant="sidebar" // or "dropdown"
            />
          }
        />

        <Route
          path="/journalCard"
          element={
            <JournalCard
              id="123"
              title="Shashank"
              content="This is a preview of the journal content."
              createdAt={new Date().toISOString()}
              tags={["motivation", "daily"]}
            />
          }
        />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/profile/edit" element={<EditProfile/>} />
      <Route path="/setting" element={<AccountSettings/>} />
      <Route path="/privacy" element={<PrivacyPreferences/>} />
      <Route path="/avatar" element={<AvatarUploader/>} />
      </Routes>
    </Router>
  );
  }

  export default App;
