import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/dashboard'
import Comment from './components/mock/comment';
import UnsplashExample from './components/mock/unsplashLearn';
import HomePage from './components/youtube/homePage';
import Clock from './components/mock/clock';
import YoutubePlayerPage from './components/youtube/youtubeVideoPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/comment" element={<Comment />} />
      </Routes>
      <Routes>
        <Route path="/unsplash" element={<UnsplashExample />} />
      </Routes>
      <Routes>
        <Route path="/youtube" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/youtube/:videoId" element={<YoutubePlayerPage />} />
      </Routes>
      <Routes>
        <Route path="/clock" element={<Clock />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
