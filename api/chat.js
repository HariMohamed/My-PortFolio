import { portfolioContext } from './portfolioContext.js';

// Simple in-memory rate limiting
const ipRequests = new Map();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const reqData = ipRequests.get(ip) || { count: 0, startTime: now };
  if (now - reqData.startTime > RATE_LIMIT_WINDOW_MS) {
    reqData.count = 1;
    reqData.startTime = now;
  } else {
    reqData.count++;
  }
  ipRequests.set(ip, reqData);

  if (reqData.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  // Input Validation
  const { query, history = [] } = req.body;
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Query is required.' });
  }
  if (query.length > 500) {
    return res.status(400).json({ error: 'Query is too long.' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    console.error("Server Configuration Error: Missing GROQ_API_KEY");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  // Context Building (Strictly server-side controlled to prevent context spoofing)
  const contextText = `
[PROFILE]
${JSON.stringify(portfolioContext.profile || {})}

[PROJECTS]
${JSON.stringify(portfolioContext.projects || [])}

[EXPERIENCE]
${JSON.stringify(portfolioContext.experience || {})}

[SKILLS]
${JSON.stringify(portfolioContext.skills || {})}
  `.trim();

  const systemPrompt = `You are the AI assistant for Mohamed Rizq Hari's developer portfolio.

Answer ONLY from the supplied portfolio context.

Rules:
* Never invent projects, employers, customers, revenue, production deployments, technologies, metrics, or achievements.
* If information is not present in the context, explicitly say that it is not available.
* You may synthesize information from multiple portfolio sections.
* Preserve uncertainty instead of filling gaps.
* Answer naturally in the language used by the user.
* For Moroccan Darija or Arabizi, respond naturally in Moroccan Darija when possible.
* Keep answers concise and useful.
* Do not claim access to private repositories or external systems.
* Do not claim Kubernetes unless supported by context.
* Do not claim multi-agent production systems unless supported.

PORTFOLIO CONTEXT:
${contextText}`;

  // Enforce Max 3 Conversation Turns (6 messages total)
  const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
  const messages = [
    { role: 'system', content: systemPrompt },
    ...recentHistory.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.content).substring(0, 1000)
    })),
    { role: 'user', content: query }
  ];

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages,
        temperature: 0.1,
        max_tokens: 500
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      // Do not expose stack traces or raw API errors to the client
      console.error('Groq API Error:', groqRes.status, errText);
      return res.status(502).json({ error: 'The AI assistant is temporarily unavailable.' });
    }

    const data = await groqRes.json();
    const answer = data.choices?.[0]?.message?.content || 'I am unable to answer right now.';
    return res.status(200).json({ answer });
  } catch (error) {
    console.error('Network or parsing error calling Groq.');
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
