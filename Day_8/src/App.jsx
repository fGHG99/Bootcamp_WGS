import './App.css'
import Dashboard from './components/dashboard'
import Comment from './components/mock/comment';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
    </Router>
    </>
  );
}

export default App;
