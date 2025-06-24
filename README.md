# learning-quiz-ai

Learning Quiz AI is a personal web tool that turns any URL into a quiz powered by AI.
It consists of a React frontend and a FastAPI backend. The backend will use OpenAI to
generate quiz questions from web content, while Supabase handles user accounts and
history storage.

## Development Setup

### Backend (Python)
1. Install [Anaconda](https://www.anaconda.com/products/distribution).
2. Create the environment:
   ```bash
   conda env create -f environment.yml
   conda activate website_learner
   ```
3. Run tests:
   ```bash
   pytest
   ```

### Frontend (React)
1. Install Node.js (version 18 or later recommended).
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
