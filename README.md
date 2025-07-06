# website_learner

Learning Quiz AI is a personal web tool that turns any URL into a quiz powered by AI.
It consists of a React frontend and a FastAPI backend. The backend uses the OpenAI
`gpt-4o` model to generate multiple-choice questions from web content. A Supabase
client is included for future user account and history storage features.

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
6. Set environment variables before starting the API server:
   ```bash
   export OPENAI_API_KEY=<your-openai-key>
   export SUPABASE_URL=<your-supabase-url>       # used in later integrations
   export SUPABASE_API_KEY=<your-supabase-api-key>
   ```
7. Launch the development server:
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
   directory. Set `VITE_API_URL` to the address of your FastAPI server.
   During development the Vite dev server proxies `/api` requests to this
   URL so the frontend can make relative API calls:
   ```bash
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```
   Adjust the URL if your FastAPI server runs elsewhere.
4. Start the development server:
   ```bash
   npm run dev
   ```
   Open <http://localhost:5173/> in your browser.

After making changes to the frontend code run `npm run build` to ensure it
compiles successfully. You can preview the production build with `npm run
preview`.

### OpenAI configuration

Set the `OPENAI_API_KEY` environment variable before starting the backend. The
frontend no longer prompts for a key.


## User Management

The backend includes minimal runtime-only user management endpoints. Data is
stored only in memory and will be lost when the server restarts.

### Endpoints

| Method | Endpoint        | Description                                 |
| ------ | --------------- | ------------------------------------------- |
| POST   | `/register`     | Register a user with `email` and `password`.|
| POST   | `/login`        | Authenticate and return an access token.    |
| POST   | `/logout`       | Invalidate a previously issued token.       |
| GET    | `/users`        | List registered user emails.                |
| DELETE | `/users/{email}`| Delete the specified user.                  |

### Login and Register UI

Navigate to <http://localhost:5173/> and choose **Login** or **Register** from
the landing page. These forms interact with the endpoints above. Successful
registration redirects to the login screen. On login, you are taken to the home
page where you can generate quizzes.


## Docker deployment

The frontend and backend can run in separate containers using Docker Compose.
Make sure the `OPENAI_API_KEY` environment variable is available in your shell so
it is passed to the backend container.

```bash
export OPENAI_API_KEY=<your-openai-key>
# Optional Supabase configuration
export SUPABASE_URL=<your-supabase-url>
export SUPABASE_API_KEY=<your-supabase-key>

# Build images and start the stack
docker compose up --build
```

The UI will be available on <http://localhost:5173> and the API on
<http://localhost:8000>.

