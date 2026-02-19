import React from 'react';
import { Challenge } from '../types';

interface ProblemListProps {
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
}

const ProblemList: React.FC<ProblemListProps> = ({ challenges, loading, error }) => {
  if (loading) {
    return <div className='flex justify-center py-8'>Loading challenges...</div>;
  }

  if (error) {
    return <div className='text-red-600 p-4'>Error: {error}</div>;
  }

  return (
    <div className='space-y-4'>
      {challenges.map((challenge) => (
        <div key={challenge.id} className='bg-white p-6 rounded-lg shadow border'>
          <h3 className='text-lg font-semibold'>{challenge.title}</h3>
          <p className='text-gray-600'>{challenge.description}</p>
          <div className='mt-2'>
            <span className='px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded'>
              {challenge.level}
            </span>
            <span className='ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded'>
              {challenge.module_type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemList;
