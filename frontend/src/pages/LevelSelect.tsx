import { Link } from "react-router-dom";

const levels = [
  {
    name: "beginner",
    label: "Beginner",
    description: "Learn the basics of prompt engineering. Image and script prompting.",
    color: "from-green-500 to-emerald-600",
    border: "border-green-700",
    challenges: "5 challenges",
    modules: ["Image Prompting", "Script Prompting"]
  },
  {
    name: "intermediate",
    label: "Intermediate",
    description: "Level up with role prompting, format control, and more complex tasks.",
    color: "from-yellow-500 to-orange-600",
    border: "border-yellow-700",
    challenges: "4 challenges",
    modules: ["Image Prompting", "Script Prompting"]
  },
  {
    name: "advanced",
    label: "Advanced",
    description: "Master advanced techniques including code generation prompting.",
    color: "from-red-500 to-pink-600",
    border: "border-red-700",
    challenges: "5 challenges",
    modules: ["Image Prompting", "Script Prompting", "Code Prompting"]
  }
];

function LevelSelect() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">Choose Your Level</h1>
      <p className="text-gray-400 text-center mb-10">Select a difficulty level to start practicing</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level) => (
          <Link
            key={level.name}
            to={"/challenges/" + level.name}
            className={"bg-gray-900 border " + level.border + " rounded-xl p-6 hover:scale-105 transition-all duration-200 hover:shadow-lg"}
          >
            <h2 className="text-2xl font-bold mb-3">{level.label}</h2>
            <p className="text-gray-400 text-sm mb-4">{level.description}</p>
            <p className="text-gray-500 text-xs mb-3">{level.challenges}</p>
            <div className="flex flex-wrap gap-2">
              {level.modules.map((mod) => (
                <span
                  key={mod}
                  className={"text-xs px-2 py-1 rounded-full bg-gradient-to-r " + level.color + " text-white"}
                >
                  {mod}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LevelSelect;
