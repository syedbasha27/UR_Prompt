import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Master Prompt Engineering
      </h1>
      <p className="text-xl text-gray-400 mb-4">
        Learn to write better prompts through hands-on challenges.
      </p>
      <p className="text-lg text-gray-500 mb-10">
        Practice image prompting, script writing, and code generation — just like LeetCode, but for AI prompts.
      </p>

      <Link
        to="/levels"
        className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-lg hover:shadow-purple-500/25"
      >
        Start Practicing
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="text-4xl mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Image Prompting</h3>
          <p className="text-gray-400">See an image, write a prompt that could generate it. Learn to describe visuals precisely.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="text-4xl mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Script Prompting</h3>
          <p className="text-gray-400">Generate emails, speeches, blog posts — master the art of content prompting.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="text-4xl mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Code Prompting</h3>
          <p className="text-gray-400">Write prompts that generate working code. Advanced level challenges.</p>
        </div>
      </div>

      <div className="mt-16 bg-gray-900 border border-gray-800 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
          <div className="p-4">
            <div className="text-purple-400 font-bold text-lg mb-2">1. Read</div>
            <p className="text-gray-400 text-sm">Read the challenge and understand what output is needed</p>
          </div>
          <div className="p-4">
            <div className="text-pink-400 font-bold text-lg mb-2">2. Write</div>
            <p className="text-gray-400 text-sm">Write a prompt to get the desired result from an AI</p>
          </div>
          <div className="p-4">
            <div className="text-red-400 font-bold text-lg mb-2">3. Generate</div>
            <p className="text-gray-400 text-sm">Use ChatGPT or Gemini to generate the output</p>
          </div>
          <div className="p-4">
            <div className="text-orange-400 font-bold text-lg mb-2">4. Submit</div>
            <p className="text-gray-400 text-sm">Paste both your prompt and the output to get scored</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
