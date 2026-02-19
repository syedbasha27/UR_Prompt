import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">
            Top performers in prompt engineering challenges
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-center py-12 text-gray-500">
            <div className="text-center">
              <Trophy size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Leaderboard Coming Soon
              </h3>
              <p className="text-gray-600">
                Complete challenges to see your ranking here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;