import React from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Problem } from '../types';

const ProblemDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: problem, loading, error } = useApi<Problem>(`/api/problems/${id}`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading problem details.</div>;

    return (
        <div className="problem-detail">
            <h1>{problem.title}</h1>
            <p>{problem.prompt}</p>
            {/* Additional components for submission options can be added here */}
        </div>
    );
};

export default ProblemDetail;