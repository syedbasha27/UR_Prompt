import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LevelSelect from "./pages/LevelSelect";
import ChallengeList from "./pages/ChallengeList";
import ChallengePage from "./pages/ChallengePage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              PromptArena
            </Link>
            <div className="flex gap-4">
              <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link to="/levels" className="text-gray-300 hover:text-white transition">Practice</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<LevelSelect />} />
          <Route path="/challenges/:level" element={<ChallengeList />} />
          <Route path="/challenge/:id" element={<ChallengePage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
