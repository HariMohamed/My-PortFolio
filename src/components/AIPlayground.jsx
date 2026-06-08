import { useState } from "react";
import { Bot, MessageSquareText, Sparkles } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

const questions = [
  {
    question: "What do you build?",
    answer:
      "Hari builds AI-powered SaaS MVPs, automation workflows, dashboards, APIs, and production-minded web applications. The strongest fit is work that joins React interfaces, backend systems, and useful AI assistance.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "The core stack is Python, FastAPI, React, Node.js, PostgreSQL, MongoDB, LLM APIs, Docker, and n8n. He also has practical experience with Django, Express, TailwindCSS, LangChain, and REST API design.",
  },
  {
    question: "Are you available for freelance?",
    answer:
      "Yes. The best freelance fit is an AI automation, workflow tool, internal dashboard, or SaaS MVP where the first version needs to be clear, useful, and maintainable instead of over-engineered.",
  },
  {
    question: "What projects prove your skills?",
    answer:
      "SyndicAI proves AI SaaS and multi-role product thinking, Gym Coaching SaaS proves service-to-product MVP thinking, AI automation workflows prove business process design, and the MERN blog work proves full-stack delivery in a professional context.",
  },
];

export default function AIPlayground() {
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);

  return (
    <section className="section-shell" aria-labelledby="playground-heading">
      <SectionTitle
        id="playground-heading"
        eyebrow="Local AI Playground"
        title="Ask the portfolio assistant."
        description="A lightweight, local Q&A section with predefined answers. No external API, no hidden data collection."
      />

      <MotionWrapper className="ai-panel">
        <div className="ai-question-list" aria-label="Portfolio questions">
          {questions.map((item) => (
            <button
              key={item.question}
              type="button"
              className={item.question === activeQuestion.question ? "is-active" : ""}
              onClick={() => setActiveQuestion(item)}
            >
              <MessageSquareText aria-hidden="true" />
              {item.question}
            </button>
          ))}
        </div>

        <div className="ai-answer" aria-live="polite">
          <div className="ai-avatar" aria-hidden="true">
            <Bot />
          </div>
          <p className="ai-label">
            <Sparkles aria-hidden="true" />
            Portfolio Assistant
          </p>
          <h3>{activeQuestion.question}</h3>
          <p>{activeQuestion.answer}</p>
        </div>
      </MotionWrapper>
    </section>
  );
}
