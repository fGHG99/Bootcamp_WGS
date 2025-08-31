import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/dashboard'
import Comment from './components/mock/comment';
import UnsplashExample from './components/mock/unsplashLearn';
import HomePage from './components/youtube/homePage';
import Clock from './components/mock/clock';
import YoutubePlayerPage from './components/youtube/youtubeVideoPage';
import Layout from './components/layout';
import NotFound from "./components/notFound";
import { Counter } from "./components/redux/counter.jsx";
import JobApplication from "./components/redux/jobApplication.jsx";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/comment" element={<Layout><Comment /></Layout>} />
        <Route path="/unsplash" element={<Layout><UnsplashExample /></Layout>} />
        <Route path="/youtube" element={<Layout><HomePage /></Layout>} />
        <Route path="/youtube/:videoId" element={<Layout><YoutubePlayerPage /></Layout>} />
        <Route path="/clock" element={<Layout><Clock /></Layout>} />
        <Route path="/redux" element={<Layout><Counter /></Layout>} />
        <Route path="/job-application" element={<Layout><JobApplication /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
