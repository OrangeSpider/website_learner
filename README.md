# website_learner

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
3. Install the Supabase client library:
   ```bash
   pip install supabase
   ```
4. Configure Supabase connection settings by defining the `SUPABASE_URL` and
   `SUPABASE_API_KEY` environment variables.
5. Run tests:
   ```bash
   pytest
   ```
4. Set environment variables before starting the API server:
   ```bash
   export OPENAI_API_KEY=<your-openai-key>
   export SUPABASE_URL=<your-supabase-url>       # used in later integrations
   export SUPABASE_API_KEY=<your-supabase-api-key>
   ```
5. Launch the development server:
   ```bash
   uvicorn backend.main:app --reload
   ```

### Frontend (React)
1. Install Node.js (version 18 or later recommended).
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Configure the backend URL by creating a `.env` file in the `frontend`
   directory. The frontend expects the `VITE_API_URL` variable to point to
   your running FastAPI server:
   ```bash
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```
   Adjust the URL if your FastAPI server runs elsewhere.
4. Start the development server:
   ```bash
   npm run dev
   ```
   Open <http://localhost:5173/> in your browser.

The production build can be tested with `npm run build` followed by
`npm run preview`.

### Using your OpenAI API key

When opening the app for the first time you will be prompted to enter your
OpenAI API key. The key is stored in a browser cookie named `openai_key` that
expires after seven days. If the cookie already exists, you will skip the key
prompt and can immediately provide a URL. This is intended for local
development only and is not recommended for production use. You may also set
`OPENAI_API_KEY` in your shell so the backend has a default key without using
the browser prompt.

