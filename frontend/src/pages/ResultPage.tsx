import { useLocation, Link } from "react-router-dom";

interface ResultData {
  challenge_id: number;
  rule_score: number;
  similarity_score: number;
  final_score: number;
  max_score: number;
  feedback: string[];
  improvements: string[];
  auto_help: {
    message: string;
    missing_elements: string[];
    sample_prompt: string;
  } | null;
}

interface ChallengeInfo {
  id: number;
  title: string;
  level: string;
  module_type: string;
}

function ResultPage() {
  const location = useLocation();
  const state = location.state as { result: ResultData; challenge: ChallengeInfo } | null;

  if (!state) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-400 mb-4">No result data found.</p>
        <Link to="/levels" className="text-purple-400 hover:underline">Go to challenges</Link>
      </div>
    );
  }

  const { result, challenge } = state;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 5) return "text-yellow-400";
    if (score >= 3) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Excellent!";
    if (score >= 7) return "Great Job!";
    if (score >= 5) return "Good Effort!";
    if (score >= 3) return "Keep Practicing!";
    return "Needs Improvement";
  };

  const scorePercentage = (result.final_score / result.max_score) * 100;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link to={"/challenges/" + challenge.level} className="text-gray-400 hover:text-white mb-6 inline-block">
        Back to {challenge.level} challenges
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-6 text-center">
        <p className="text-gray-400 mb-2">Challenge: {challenge.title}</p>
        <h1 className={"text-5xl font-extrabold mb-2 " + getScoreColor(result.final_score)}>
          {result.final_score} / {result.max_score}
        </h1>
        <p className={"text-xl font-bold " + getScoreColor(result.final_score)}>
          {getScoreLabel(result.final_score)}
        </p>

        <div className="w-full max-w-md mx-auto mt-6 bg-gray-800 rounded-full h-4">
          <div
            className={"h-4 rounded-full transition-all duration-1000 " + (result.final_score >= 7 ? "bg-green-500" : result.final_score >= 4 ? "bg-yellow-500" : "bg-red-500")}
            style={{ width: scorePercentage + "%" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-3">Rule-Based Score</h3>
          <p className={"text-3xl font-bold " + getScoreColor(result.rule_score)}>
            {result.rule_score} / 10
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Based on prompt structure: role, format, constraints, clarity, audience
          </p>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
            <div
              className="h-2 rounded-full bg-purple-500 transition-all duration-1000"
              style={{ width: ((result.rule_score / 10) * 100) + "%" }}
            />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-3">Similarity Score</h3>
          <p className={"text-3xl font-bold " + getScoreColor(result.similarity_score)}>
            {result.similarity_score} / 10
          </p>
          <p className="text-gray-400 text-sm mt-2">
            How well your output matches the expected result
          </p>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
            <div
              className="h-2 rounded-full bg-pink-500 transition-all duration-1000"
              style={{ width: ((result.similarity_score / 10) * 100) + "%" }}
            />
          </div>
        </div>
      </div>

      {result.feedback.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-3">What You Did Well</h3>
          <ul className="space-y-2">
            {result.feedback.map((item, i) => (
              <li key={i} className="text-green-300 text-sm">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {result.improvements.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-3">How to Improve</h3>
          <ul className="space-y-2">
            {result.improvements.map((item, i) => (
              <li key={i} className="text-yellow-300 text-sm">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {result.auto_help && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-3 text-red-300">Auto Help</h3>
          <p className="text-red-200 text-sm mb-4">{result.auto_help.message}</p>

          <div className="mb-4">
            <p className="text-sm font-bold text-red-300 mb-2">Missing elements:</p>
            <ul className="space-y-1">
              {result.auto_help.missing_elements.map((item, i) => (
                <li key={i} className="text-red-200 text-sm">- {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-bold text-gray-300 mb-2">Sample Prompt Template:</p>
            <p className="text-green-300 text-sm font-mono whitespace-pre-wrap">{result.auto_help.sample_prompt}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center mt-8 mb-12">
        <Link
          to={"/challenge/" + challenge.id}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition"
        >
          Try Again
        </Link>
        <Link
          to={"/challenges/" + challenge.level}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition"
        >
          More Challenges
        </Link>
        <Link
          to="/levels"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-xl transition"
        >
          All Levels
        </Link>
      </div>
    </div>
  );
}

export default ResultPage;
