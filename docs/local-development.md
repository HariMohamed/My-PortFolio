# Local development

```bash
npm install
cp .env.example .env   # then set GROQ_API_KEY (PowerShell: Copy-Item .env.example .env)
npm run dev            # http://localhost:5173
```

- `npm run dev` also serves `POST /api/chat` locally (Vite middleware in `vite.config.js` that runs `api/chat.js`). In production the same file runs as a Vercel serverless function.
- Without `GROQ_API_KEY`, questions that need the LLM return a generic "unavailable" message; keyword-routed questions still work.
- Most questions are answered in the browser by the keyword router (`src/assistant/`) and never call Groq. Only unmatched, non-English, or claim-style questions reach the provider.
- The dev server listens on all interfaces (`host: "0.0.0.0"`), so anyone on your network can use `/api/chat` with your key (limited to 10 requests/min per client). Use `npm run dev -- --host 127.0.0.1` on shared networks.
- Tests: `npm run build` then `npm test`. Chat API tests mock the provider and never use a real key.
- `GEMINI_API_KEY` may exist in older `.env` files; no code reads it.
