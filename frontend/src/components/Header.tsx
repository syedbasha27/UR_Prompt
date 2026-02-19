import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Home, Trophy, BookOpen } from 'lucide-react';

interface HeaderProps {
  user?: {
    id: number;
    username: string;
    email: string;
  } | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold hover:text-blue-200">
              PromptArena
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
              <Link
                to="/problems"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                <BookOpen size={16} />
                <span>Problems</span>
              </Link>
              <Link
                to="/leaderboard"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                <Trophy size={16} />
                <span>Leaderboard</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;