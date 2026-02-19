import React, { useEffect, useState } from 'react';
import ProblemList from '../components/ProblemList';
import { Challenge } from '../types';

const Problems: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ level?: string; module_type?: string }>({});

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.level) params.append('level', filters.level);
        if (filters.module_type) params.append('module_type', filters.module_type);

        const response = await fetch(`http://localhost:8000/challenges?${params}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }

        const data = await response.json();
        setChallenges(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setChallenges([]);
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [filters]);

  const handleFilterChange = (newFilters: { level?: string; module_type?: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Challenges</h1>
          <p className="text-gray-600">
            Practice your prompt engineering skills with real-world challenges
          </p>
        </div>

        <ProblemList
          challenges={challenges}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Problems;