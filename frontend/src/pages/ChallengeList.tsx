import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Challenge {
  id: number;
  title: string;
  description: string;
  level: string;
  module_type: string;
  image_url: string;
}

function ChallengeList() {
  const { level } = useParams<{ level: string }>();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("http://localhost:8000/challenges/level/" + level)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch challenges");
        return res.json();
      })
      .then((data) => {
        setChallenges(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [level]);

  const getModuleIcon = (type: string) => {
    if (type === "image") return "";
    if (type === "script") return "";
    if (type === "code") return "";
    return "";
  };

  const getModuleColor = (type: string) => {
    if (type === "image") return "bg-blue-600";
    if (type === "script") return "bg-green-600";
    if (type === "code") return "bg-purple-600";
    return "bg-gray-600";
  };

  const getLevelColor = () => {
    if (level === "beginner") return "text-green-400";
    if (level === "intermediate") return "text-yellow-400";
    if (level === "advanced") return "text-red-400";
    return "text-gray-400";
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-400">Loading challenges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <p className="text-gray-500">Make sure the backend server is running on http://localhost:8000</p>
        <Link to="/levels" className="text-purple-400 hover:underline mt-4 inline-block">Back to levels</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/levels" className="text-gray-400 hover:text-white mb-6 inline-block">Back to levels</Link>
      <h1 className="text-3xl font-bold mb-2">
        <span className={getLevelColor()}>{level ? level.charAt(0).toUpperCase() + level.slice(1) : ""}</span> Challenges
      </h1>
      <p className="text-gray-400 mb-8">{challenges.length} challenges available</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <Link
            key={challenge.id}
            to={"/challenge/" + challenge.id}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-600 transition-all hover:shadow-lg hover:shadow-purple-500/10"
          >
            {challenge.module_type === "image" && challenge.image_url && (
              <img
                src={challenge.image_url}
                alt={challenge.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={"text-xs px-2 py-1 rounded-full text-white " + getModuleColor(challenge.module_type)}>
                  {getModuleIcon(challenge.module_type)} {challenge.module_type}
                </span>
                <span className="text-xs text-gray-500">#{challenge.id}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{challenge.title}</h3>
              <p className="text-gray-400 text-sm">{challenge.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {challenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No challenges found for this level.</p>
        </div>
      )}
    </div>
  );
}

export default ChallengeList;
