import React, { useState } from 'react';

const PromptEditor: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/evaluate-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to evaluate prompt');
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prompt-editor">
            <h2>Prompt Editor</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Write your prompt here..."
                    rows={5}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Evaluating...' : 'Submit Prompt'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && <p className="result">Result: {result}</p>}
        </div>
    );
};

export default PromptEditor;