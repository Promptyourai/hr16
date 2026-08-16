# PeopleHub — HR Portal

Full-stack HR Portal with embedded Azure OpenAI agent.

Folders:
- `frontend` — React 18 + Vite + TypeScript app
- `backend` — Node + Express API for `/api/chat`
- `netlify/functions/chat.ts` — Netlify Function for serverless chat

Prereqs
- Node 18+ and npm

Quick local run
1. Install frontend deps:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. In a separate terminal run backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. Open `http://localhost:5173`

Netlify deploy (summary)
1. Create a GitHub repo and push the project root to it.
2. Connect repository to Netlify.
3. Set these Netlify environment variables (Project → Settings → Environment):
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_DEPLOYMENT`
4. Netlify build command: `npm run build --prefix frontend` (already in `netlify.toml`).

Files to verify first
- `frontend/src/components/ChatWidget.tsx`
- `backend/index.js`
- `netlify/functions/chat.ts`
- `.env.example`

Note: A small automated commit was made to trigger a Netlify redeploy.

