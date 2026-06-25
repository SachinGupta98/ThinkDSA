# ThinkDSA 🧠

ThinkDSA is an AI-powered Data Structures and Algorithms (DSA) mentor and problem analyzer designed to help BTech CS students master algorithmic thinking, not just memorize code. It acts as your personal senior engineer, guiding you through problems, analyzing your code, mapping out the 450 DSA roadmap, and keeping track of your progress in a Knowledge Vault.

## ✨ Features

### 1. 🤖 AI Problem Analyzer
- Paste any LeetCode, GeeksforGeeks, Codeforces, or HackerRank URL and ThinkDSA automatically fetches the problem.
- Upload an image of a problem and our Vision AI extracts the text seamlessly.
- Provides deep architectural breakdowns:
  - **Problem Decoded**: Simple English explanation.
  - **Constraint Intelligence**: What the limits tell you about the required time complexity.
  - **Pattern Detected**: Identifies the core algorithmic pattern (e.g., Sliding Window, Two Pointers).
  - **Decision Tree**: Step-by-step logic on how to arrive at the solution.
  - **Code Analysis**: If you paste your attempted code, the AI reviews it for logic errors, missed edge cases, and complexity improvements.
  - **Alternative Approaches**: Compares different ways to solve it with tradeoffs.

### 2. 💬 Btech Buddy (AI Mentor)
- A conversational AI agent built specifically to act as a senior software engineer mentor.
- Helps you build a personalized DSA roadmap based on your current year and placement goals.
- Features **Persistent Memory**: The Buddy remembers your past conversations across sessions using Supabase storage.
- Easily start a "New Chat" to clear context and focus on a new topic.

### 3. 📚 450 DSA Sheet Integration
- A complete, native, interactive UI for the legendary "Love Babbar 450 DSA Sheet".
- All 448 problems categorized by topic with direct practice links to GFG and LeetCode.
- **Analyse Now Button**: Click this button next to any problem to instantly launch the AI Analyzer with that problem's context pre-loaded.

### 4. 🗃️ My Vault & Profile Dashboard
- Save any AI analysis directly to your personal Knowledge Vault.
- View your **Activity Heatmap** to track your daily practice streak.
- The **Pattern Brain** visually tracks your mastery across the 8 core DSA patterns (Arrays, DP, Graphs, etc.) based on the problems you analyze.

### 5. 🧩 Pattern Library
- Educational hub detailing the core algorithmic patterns.
- Teaches you the "Recognition Signals" for each pattern so you instantly know when to apply them in interviews.

## 🛠️ Tech Stack

**Frontend**:
- Next.js 14 (App Router)
- React
- Tailwind CSS
- TypeScript
- Lucide Icons
- Recharts (for Dashboard data visualization)

**Backend**:
- Python / Flask
- Groq AI (`llama-3.3-70b-versatile` for lightning-fast inference)
- Google Gemini Vision (`gemini-1.5-flash` for OCR image extraction)
- Supabase (PostgreSQL, Row Level Security, Authentication)

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- A Supabase Project
- API Keys: Groq, Google Gemini

### 1. Clone & Setup Database
1. Clone the repository.
2. In your Supabase dashboard, open the SQL Editor and run the queries found in `supabase_schema.sql` to create the `analyzed_problems`, `vault_entries`, and `buddy_chats` tables along with their RLS policies.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```
Create a `.env` file in the `backend/` directory:
```env
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
FLASK_DEBUG=1
```
Run the Flask server:
```bash
python app.py
```
*The backend will run on `http://127.0.0.1:5000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
Run the Next.js development server:
```bash
npm run dev
```
*The frontend will run on `http://localhost:3000`*

## 💡 Architecture & Key Decisions
- **Decoupled AI Layer**: We used Python/Flask for the backend specifically because the Python ecosystem for AI/LLM SDKs (Groq, Gemini) is significantly more mature and easier to manipulate for prompt chaining and JSON validation than Node.js.
- **Why Groq?**: The Llama 3.3 70B model running on Groq LPUs provides near-instantaneous streaming responses, crucial for the complex JSON structures we generate for the Problem Analyzer without making the user wait 30+ seconds.
- **Stateless Frontend API**: The Next.js frontend only manages UI state. All complex logic (parsing URLs, extracting text from images, maintaining prompt templates) is centralized in the Flask blueprints (`/routes/analyze.py`, `/routes/buddy.py`).
- **Data Hydration**: The 450 DSA Sheet is parsed offline from Markdown into a lightweight JSON file served statically by Next.js, ensuring 0ms load times for the massive problem list.

## 🏆 Hackathon Pitch Summary
ThinkDSA bridges the gap between rote memorization and true algorithmic problem-solving. While standard platforms give you a green checkmark or a red 'X', ThinkDSA acts as the senior engineer sitting beside you, explaining *why* a pattern fits, *how* to build the decision tree, and *what* edge cases you missed. Built with a modern, high-performance stack (Next.js + Flask + Groq), it scales beautifully and provides a stunning, glassmorphism UI that makes studying DSA an engaging experience.
