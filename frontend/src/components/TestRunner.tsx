import React, { useState } from 'react';

const TestRunner: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const runCode = async () => {
        setOutput(null);
        setError(null);
        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const result = await response.json();
            if (response.ok) {
                setOutput(result.output);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred while running the code.');
        }
    };

    return (
        <div>
            <h2>Test Runner</h2>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                cols={50}
                placeholder="Write your code here..."
            />
            <br />
            <button onClick={runCode}>Run Code</button>
            {output && (
                <div>
                    <h3>Output:</h3>
                    <pre>{output}</pre>
                </div>
            )}
            {error && (
                <div>
                    <h3>Error:</h3>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default TestRunner;