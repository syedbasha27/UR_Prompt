import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

interface ChallengeData {
  id: number;
  title: string;
  description: string;
  level: string;
  module_type: string;
  image_url: string;
  hint: string;
  test_cases: Array<{ input: any; expected: any }>;
}

function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState("");
  const [hintObjective, setHintObjective] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/challenges/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setChallenge(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const fetchHint = () => {
    fetch("http://localhost:8000/challenges/" + id + "/hint")
      .then((res) => res.json())
      .then((data) => {
        setHintText(data.hint);
        setHintObjective(data.teaching_objective);
        setShowHint(true);
      });
  };

  const handleSubmit = () => {
    if (!userPrompt.trim()) {
      alert("Please write your prompt first!");
      return;
    }
    if (!generatedOutput.trim() && challenge?.module_type !== "code") {
      alert("Please paste the generated output!");
      return;
    }
    if (challenge?.module_type === "code" && !generatedCode.trim()) {
      alert("Please paste the generated code!");
      return;
    }

    setSubmitting(true);

    const body = {
      challenge_id: Number(id),
      user_prompt: userPrompt,
      generated_output: generatedOutput || generatedCode,
      generated_code: challenge?.module_type === "code" ? generatedCode : undefined,
      generated_image_description: challenge?.module_type === "image" ? imageDescription : undefined,
    };

    fetch("http://localhost:8000/submissions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        setSubmitting(false);
        navigate("/result", { state: { result, challenge } });
      })
      .catch((err) => {
        setSubmitting(false);
        alert("Submission failed: " + err.message);
      });
  };

  const handleGeminiGenerate = async () => {
    if (!userPrompt.trim()) {
      alert("Please write a prompt first!");
      return;
    }

    setIsGeneratingImage(true);
    try {
      const isImage = challenge?.module_type === "image";
      const endpoint = isImage 
        ? "http://localhost:8000/gemini/generate-image" 
        : "http://localhost:8000/gemini/generate-text";

      const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await response.json();

      if (isImage) {
          if (data.image_url) {
              setGeneratedOutput(data.image_url);
              if (data.description) {
                 setImageDescription(data.description);
              }
          } else {
              alert("Failed to generate image");
          }
      } else {
          // Text or Code generation
          if (data.generated_text) {
              if (challenge?.module_type === "code") {
                  // For code challenges, the output goes to generatedCode state
                  setGeneratedCode(data.generated_text);
                  // Also set output for consistency if needed, but the submit handler uses generatedCode first
              } else {
                  // For script/text challenges
                  setGeneratedOutput(data.generated_text);
              }
          } else {
              alert("Failed to generate content");
          }
      }

    } catch (e: any) {
      alert("Error generating content: " + e.message);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const openChatGPT = () => {
    window.open("https://chat.openai.com", "_blank");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (challenge?.module_type === "code") {
          setGeneratedCode(content);
        } else {
          setGeneratedOutput(content);
        }
      };
      reader.readAsText(file);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-400">Loading challenge...</p>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-red-400">{error || "Challenge not found"}</p>
        <Link to="/levels" className="text-purple-400 hover:underline mt-4 inline-block">Back</Link>
      </div>
    );
  }

  const moduleIcon = challenge.module_type === "image" ? "" : challenge.module_type === "code" ? "" : "";

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link to={"/challenges/" + challenge.level} className="text-gray-400 hover:text-white mb-4 inline-block">
        Back to {challenge.level} challenges
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-purple-600 text-white">
            {moduleIcon} {challenge.module_type}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300">
            {challenge.level}
          </span>
          <span className="text-xs text-gray-500">#{challenge.id}</span>
        </div>
        <h1 className="text-2xl font-bold mb-3">{challenge.title}</h1>
        <p className="text-gray-300 text-lg">{challenge.description}</p>

        {challenge.module_type === "code" && challenge.test_cases && challenge.test_cases.length > 0 && (
          <div className="mt-4 bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-gray-300 mb-2">Sample Test Cases:</h3>
            {challenge.test_cases.map((tc: any, i: number) => (
              <div key={i} className="text-sm text-gray-400 mb-1">
                <span className="text-green-400">Input:</span> {JSON.stringify(tc.input)}{" "}
                <span className="text-blue-400">Expected:</span> {JSON.stringify(tc.expected)}
              </div>
            ))}
          </div>
        )}
      </div>

      {challenge.module_type === "image" && challenge.image_url && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold mb-3">Reference Image</h2>
          <p className="text-gray-400 text-sm mb-3">Write a prompt that could generate this image:</p>
          <img
            src={challenge.image_url}
            alt={challenge.title}
            className="w-full max-h-96 object-contain rounded-lg bg-gray-800"
          />
        </div>
      )}

      <div className="mb-6">
        {!showHint ? (
          <button
            onClick={fetchHint}
            className="bg-gray-800 hover:bg-gray-700 text-yellow-400 px-4 py-2 rounded-lg text-sm transition"
          >
            Get Hint
          </button>
        ) : (
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4">
            <p className="text-yellow-300 font-bold text-sm mb-1">Hint</p>
            <p className="text-yellow-200 text-sm mb-2">{hintText}</p>
            <p className="text-yellow-500 text-xs">Teaching objective: {hintObjective}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-1">Step 1: Write Your Prompt</h2>
        <p className="text-gray-400 text-sm mb-3">
          Write the best prompt you can to achieve the task described above.
        </p>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Write your prompt here... (e.g., You are a professional photographer. Describe a scene with...)"
          className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{userPrompt.split(/\s+/).filter(Boolean).length} words</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-1">Step 2: Generate Output</h2>
        <p className="text-gray-400 text-sm mb-4">
          Copy your prompt above and paste it into one of these AI tools:
        </p>
        <div className="flex gap-4 mb-4">
          <button
            onClick={openChatGPT}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            Open ChatGPT
          </button>
          
          <button
            onClick={handleGeminiGenerate}
            disabled={isGeneratingImage}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {isGeneratingImage ? "Generating..." : "Generate with Gemini"}
          </button>
          
          <button
              onClick={() => window.open("https://gemini.google.com", "_blank")}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-bold transition text-sm"
          >
              Open External
          </button>
        </div>
        <p className="text-gray-500 text-xs">Opens in a new tab. Paste your prompt there, then copy the result back here.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-1">Step 3: Paste Generated Output or Upload File</h2>
        <p className="text-gray-400 text-sm mb-3">
          {challenge.module_type === "code"
            ? "Paste the generated code below or upload a file:"
            : "Paste the text output that the AI generated or upload a file:"
          }
        </p>

        {challenge.module_type === "image" && generatedOutput && (generatedOutput.startsWith("http") || generatedOutput.startsWith("data:")) ? (
             <div className="mb-4 bg-gray-800 p-4 rounded-lg">
                 <p className="text-gray-400 text-sm mb-2">Generated Image:</p>
                 <img 
                    src={generatedOutput} 
                    alt="Generated by Gemini" 
                    className="w-full max-h-96 object-contain rounded-lg border border-gray-700"
                 />
                 <p className="text-xs text-gray-500 mt-2 italic">Image generated via Gemini API</p>
             </div>
        ) : (
            <div className="mb-4">
            <label className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-lg p-6 cursor-pointer transition">
                <input
                type="file"
                accept=".txt,.py,.js,.md,.json"
                onChange={handleFileUpload}
                className="hidden"
                />
                <div className="text-center">
                <div className="text-3xl mb-2">📁</div>
                <p className="text-gray-300 font-semibold mb-1">
                    {uploadedFile ? `✅ ${uploadedFile.name}` : "Click to upload file"}
                </p>
                <p className="text-gray-500 text-xs">
                    Supports .txt, .py, .js, .md, .json files
                </p>
                </div>
            </label>
            </div>
        )}

        {challenge.module_type !== "image" && <div className="text-center text-gray-500 text-sm mb-4">— OR —</div>}

        {challenge.module_type === "code" ? (
          <textarea
            value={generatedCode}
            onChange={(e) => setGeneratedCode(e.target.value)}
            placeholder={isGeneratingImage ? "Generating code..." : "Paste the generated Python code here..."}
            className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg p-4 text-green-400 font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
          />
        ) : challenge.module_type !== "image" ? (
          <textarea
            value={generatedOutput}
            onChange={(e) => setGeneratedOutput(e.target.value)}
            placeholder={isGeneratingImage ? "Generating content..." : "Paste the generated output here..."}
            className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
          />
        ) : null}
      </div>

      <div className="text-center mb-12">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all shadow-lg hover:shadow-purple-500/25"
        >
          {submitting ? "Evaluating..." : "Submit and Get Score"}
        </button>
      </div>
    </div>
  );
}

export default ChallengePage;
