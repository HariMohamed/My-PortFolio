import { useState } from "react";
import { Bot, MessageSquareText, Send, Sparkles } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";
import { resolvePortfolioQuestion } from "../data/portfolioKnowledge";

const starterQuestions = [
  "Who is Hari?",
  "What technologies do you use?",
  "Tell me about SyndicAI.",
  "How can I contact you?",
];

export default function AIPlayground() {
  const [input, setInput] = useState("");
  const [contextProject, setContextProject] = useState(null);
  const [result, setResult] = useState(() => resolvePortfolioQuestion(starterQuestions[0]));

  function ask(question) {
    const nextResult = resolvePortfolioQuestion(question, contextProject);
    if (!nextResult) return;
    setResult(nextResult);
    setContextProject(nextResult.contextProject || null);
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    ask(input);
  }

  return (
    <section className="section-shell" aria-labelledby="playground-heading">
      <SectionTitle
        id="playground-heading"
        eyebrow="Portfolio Discovery"
        title="Explore the work by question."
        description="Ask about projects, contributions, skills, evidence, experience, education, or contact details. Answers are local, deterministic, and linked to the relevant destination."
      />

      <MotionWrapper className="ai-panel">
        <div>
          <form className="ai-query-form" onSubmit={handleSubmit}>
            <label htmlFor="portfolio-question">Ask about the portfolio</label>
            <div className="ai-query-row">
              <input
                id="portfolio-question"
                className="ai-query-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="e.g. Which project shows backend work?"
              />
              <button type="submit" className="ai-query-submit" aria-label="Ask portfolio assistant">
                <Send aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="ai-question-list" aria-label="Suggested portfolio questions">
            {starterQuestions.map((question) => (
              <button key={question} type="button" onClick={() => ask(question)}>
                <MessageSquareText aria-hidden="true" />
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="ai-answer" aria-live="polite">
          <div className="ai-avatar" aria-hidden="true">
            <Bot />
          </div>
          <p className="ai-label">
            <Sparkles aria-hidden="true" />
            Portfolio Knowledge Assistant
          </p>
          <p>{result.answer}</p>
          <div className="ai-answer-actions">
            <a className="btn btn-primary" href={result.destination.href}>{result.destination.label}</a>
            <div className="ai-follow-ups" aria-label="Suggested follow-up questions">
              {result.suggestions.slice(0, 3).map((suggestion) => (
                suggestion.href ? (
                  <a key={suggestion.label} className="text-link" href={suggestion.href}>{suggestion.label}</a>
                ) : (
                  <button key={suggestion.label} type="button" className="text-link" onClick={() => ask(suggestion.query)}>{suggestion.label}</button>
                )
              ))}
            </div>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
}
