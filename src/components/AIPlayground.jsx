import { useState } from "react";
import { Bot, MessageSquareText, Sparkles } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

const questions = [
  {
    question: "What can I build?",
    answer:
      "Hari builds AI-powered SaaS MVPs, automation workflows, dashboards, APIs, and maintainable web applications. The strongest fit is work that joins React interfaces, backend systems, and useful AI assistance.",
  },
  {
    question: "What did I personally contribute?",
    answer:
      "The case studies describe contributions across FastAPI and PostgreSQL backend work, React and Next.js interfaces, REST APIs, authentication flows, AI integrations, and automation.",
  },
  {
    question: "Which project best demonstrates backend engineering?",
    answer:
      "SyndicAI is the clearest backend-focused case study, describing FastAPI, PostgreSQL, Redis, Celery, multi-tenant boundaries, and AI integration.",
  },
  {
    question: "What evidence can I review?",
    answer:
      "Each project has a deployed application and a portfolio case study. The repositories are private, so the public evidence is the live deployment, technical overview, and project-specific explanation.",
  },
];

export default function AIPlayground() {
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);

  return (
    <section className="section-shell" aria-labelledby="playground-heading">
      <SectionTitle
        id="playground-heading"
        eyebrow="Portfolio Discovery"
        title="Explore the work by question."
        description="A lightweight, local Q&A section with predefined answers about projects, contributions, evidence, and role fit."
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
