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
3. Configure the backend URL by creating a `.env` file in the `frontend`
   directory:
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
development only and is not recommended for production use.

## Deploying to GitHub Pages

1. Make sure the `base` option in `frontend/vite.config.ts` matches your
   repository name. For this project it is set to `/website_learner/`.
2. Build and publish the site:
   ```bash
   cd frontend
   npm run deploy
   ```
   The command uses [gh-pages](https://github.com/tschaub/gh-pages) to push the
   contents of the `dist` folder to the `gh-pages` branch so it can be served on
   GitHub Pages.

   Once published, your site will be available at:
   `https://<your-github-username>.github.io/website_learner/`
