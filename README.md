# PromptArena 🚀# PromptArena



A LeetCode-style platform for learning prompt engineering. Master the art of crafting effective AI prompts through interactive challenges across different skill levels and modules.PromptArena is a LeetCode-like platform focused on prompt engineering, allowing users to create, evaluate, and share prompts. The application is built using a modern tech stack, including React with Vite for the frontend, FastAPI for the backend, and SQLite for the database.



## 🎯 Features## Features



### 🔐 User System- **User Authentication**: Users can register, log in, and manage their profiles.

- **JWT Authentication** - Secure registration and login- **Problem List**: A comprehensive list of prompt engineering challenges categorized by difficulty.

- **Progress Tracking** - Monitor your learning journey- **Prompt Submission**: Users can write and submit their prompts for evaluation.

- **Score System** - Get feedback on your prompt quality- **Test Runner**: A safe environment to execute submitted code and display results.

- **Leaderboard**: A ranking system showcasing top users based on their scores and progress.

### 📊 Level System

- **Beginner** - Learn basic prompt structure and components## Tech Stack

- **Intermediate** - Master advanced techniques and context setting  

- **Advanced** - Include code generation challenges with safe execution- **Frontend**: React, Vite, TypeScript, Tailwind CSS

- **Backend**: Python, FastAPI, SQLAlchemy, SQLite

### 🖼️ Image Prompting Module- **Database**: SQLite

- View reference images

- Write prompts to recreate them## Getting Started

- External validation via ChatGPT/Gemini

- Comprehensive scoring system### Frontend



### 📝 Script/Information Prompting Module  1. Navigate to the `frontend` directory:

- Creative writing challenges   ```bash

- Business communication tasks   cd frontend

- Technical documentation exercises   ```

- Auto-generated feedback

2. Install dependencies:

### 💻 Code Prompting Module (Advanced)   ```bash

- Algorithm and data structure problems   npm install

- Safe sandboxed code execution   ```

- Automated test case validation

- Prompt quality + code correctness scoring3. Start the development server:

   ```bash

### 🤖 AI-Powered Evaluation Engine   npm run dev

- **Rule-based scoring** (role, format, constraints, clarity, audience)   ```

- **Semantic similarity** using sentence-transformers

- **Auto-help system** for low scores### Backend

- **Intelligent hints** based on learning objectives

1. Navigate to the `backend` directory:

## 🛠️ Tech Stack   ```bash

   cd backend

### Frontend   ```

- **React 18** with TypeScript

- **Vite** for fast development2. Install dependencies:

- **Tailwind CSS** for styling   ```bash

- **Lucide React** for icons   pip install -r requirements.txt

- **React Router** for navigation   ```



### Backend  3. Run the FastAPI application:

- **Python FastAPI** for high-performance API   ```bash

- **SQLAlchemy** with SQLite database   uvicorn app.main:app --reload

- **JWT Authentication** with bcrypt   ```

- **Pydantic** for data validation

## Contributing

### AI/ML (Free & Open Source)

- **sentence-transformers** for semantic similarityContributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

- **transformers** for local model inference

- **HuggingFace models** for evaluation## License

- **PyTorch** for ML operations

This project is licensed under the MIT License. See the LICENSE file for details.
## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** and npm installed
- **Git** for cloning the repository

### Installation

1. **Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (Windows)
py -m venv venv
# Or on macOS/Linux:
# python3 -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn app.main:app --reload --port 8000
```

2. **Frontend Setup**
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
PromptArena/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── database.py          # Database configuration
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── routers/
│   │   │   ├── users.py         # Authentication endpoints
│   │   │   ├── problems.py      # Challenge endpoints
│   │   │   └── submissions.py   # Submission endpoints
│   │   └── services/
│   │       ├── evaluation.py    # Prompt scoring engine
│   │       └── llm_integration.py # Code execution
│   ├── requirements.txt         # Python dependencies
│   └── promptarena.db          # SQLite database (auto-created)
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/             # Custom hooks (useApi)
│   │   ├── pages/             # Page components
│   │   ├── types/             # TypeScript interfaces
│   │   ├── styles/            # CSS files
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── package.json          # Node dependencies
│   ├── vite.config.ts       # Vite configuration
│   └── tailwind.config.js   # Tailwind configuration
└── README.md               # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Challenges
- `GET /challenges/` - List all challenges
- `GET /challenges/next` - Get next uncompleted challenge
- `GET /challenges/{id}` - Get specific challenge
- `GET /challenges/{id}/hint` - Get challenge hint

### Submissions
- `POST /submissions/` - Submit solution
- `GET /submissions/` - Get user submissions
- `GET /submissions/{id}` - Get specific submission
- `GET /submissions/progress/me` - Get progress summary

## 🎮 How to Play

### 1. Register & Login
Create your account and sign in to start your prompt engineering journey.

### 2. Choose Your Level
- **Beginner**: Learn prompt basics with image and script challenges
- **Intermediate**: Master advanced techniques and context setting
- **Advanced**: Tackle code generation with automated testing

### 3. Solve Challenges
- Read the challenge description carefully
- Write your prompt following best practices
- Submit your prompt and generated output
- Get instant AI-powered feedback

### 4. Learn from Feedback
- **Rule-based score**: Structure, clarity, specificity
- **Similarity score**: How well output matches expectations
- **Suggestions**: Actionable improvement tips
- **Auto-help**: Triggered for scores below 2/10

### 5. Track Progress
Monitor your improvement across:
- Challenges completed
- Average scores
- Learning objectives mastered
- Skill progression

## 📈 Scoring System

### Rule-Based Scoring (40% weight)
- **+2 points**: Role specification ("Act as...", "You are...")
- **+2 points**: Output format defined ("Format: JSON", "Write in...")
- **+2 points**: Constraints specified (length, tone, style)
- **+2 points**: Clear task description with action verbs
- **+2 points**: Audience/context mentioned

### Semantic Similarity (60% weight)
- Uses sentence-transformers to compare output with expected result
- Measures how well your prompt achieved the intended goal
- Accounts for semantic meaning, not just keyword matching

### Final Score Calculation
```
Final Score = (Rule Score × 0.4) + (Similarity Score × 0.6)
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit changes: `git commit -m "Add feature description"`
5. Push to your fork: `git push origin feature-name`
6. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

**Python virtual environment issues:**
- Make sure Python 3.8+ is installed
- Try `py -m venv venv` on Windows or `python3 -m venv venv` on macOS/Linux
- If issues persist, install Python from python.org

**Node.js dependency issues:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js 16+ is installed

**Port conflicts:**
- Backend runs on port 8000
- Frontend runs on port 5173
- Change ports in configuration files if needed

## 📚 Sample Challenges

The application comes pre-seeded with challenges including:

**Beginner Level:**
- Image prompting (sunset beach, cute cat)
- Script writing (welcome emails, product descriptions)

**Intermediate Level:**
- Advanced image generation (futuristic cities)
- Technical writing (blog posts, motivational speeches)

**Advanced Level:**
- Code generation (palindrome checker, Fibonacci, word counter)

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **HuggingFace** for free transformer models
- **FastAPI** for the amazing web framework
- **React & Vite** for powerful frontend tools
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ for the AI community**

Happy prompting! 🎯✨

## 🚀 Getting Started Now

1. **Install Python 3.8+ and Node.js 16+**
2. **Clone/download this project**
3. **Follow the Quick Start instructions above**
4. **Visit http://localhost:5173 to start learning!**

The application includes a complete prompt engineering curriculum with instant AI-powered feedback to help you master this essential skill.