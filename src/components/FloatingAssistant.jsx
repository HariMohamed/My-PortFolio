import { useEffect, useRef, useState } from "react";
import { Bot, MessageSquareText, Send, Sparkles, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { resolvePortfolioQuestion } from "../data/portfolioKnowledge";
import { createConversationContext, getContextualIntroduction, getPageContext } from "../assistant/context/conversationContext";

const defaultQuestions = ["Who is Hari?", "Which projects use FastAPI?", "Tell me about OraBella.", "How can I contact you?"];
const REQUEST_TIMEOUT_MS = 20000;

function starterQuestions(pageContext) {
  if (pageContext.project) return ["What was Hari's role?", "What technologies were used?", "What evidence is available?"];
  if (pageContext.section === "experience") return ["What experience does Hari have?", "Which technologies has he used professionally?"];
  return defaultQuestions;
}

export default function FloatingAssistant() {
  const location = useLocation();
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const pageContext = getPageContext(location);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [contextProject, setContextProject] = useState(pageContext.project);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setContextProject(pageContext.project);
    setMessages([]);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      return undefined;
    }
    inputRef.current?.focus();
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll("button, input, a");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const [isLoading, setIsLoading] = useState(false);

  async function ask(question) {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const newMessages = [...messages, { role: "user", text: trimmed }];
    setMessages(newMessages);
    setInput("");

    const result = resolvePortfolioQuestion(trimmed, contextProject, pageContext);

    if (result && !result.needsLLM) {
      setMessages([...newMessages, { role: "assistant", result }]);
      setContextProject(result.contextProject || contextProject);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const history = newMessages.slice(-6).map(m => ({
        role: m.role,
        content: m.text || m.result?.answer || ""
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, history }),
        signal: controller.signal
      });

      if (res.status === 429) throw new Error('RATE_LIMITED');
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();

      const llmResult = {
        answer: data.answer,
        destination: null,
        suggestions: []
      };
      setMessages([...newMessages, { role: "assistant", result: llmResult }]);
    } catch(err) {
      const answer = err.name === "AbortError"
        ? "The assistant took too long to respond. Please try again, or explore the portfolio directly."
        : err.message === "RATE_LIMITED"
          ? "You're sending questions quickly. Please wait a moment and try again."
          : "The AI assistant is temporarily unavailable. Please try exploring the portfolio directly.";
      const fallbackResult = {
        answer,
        destination: { href: "#contact", label: "Get in touch" },
        suggestions: []
      };
      setMessages([...newMessages, { role: "assistant", result: fallbackResult }]);
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  }

  function close() { setOpen(false); }
  const intro = getContextualIntroduction(pageContext);
  const suggestions = starterQuestions(pageContext);

  return (
    <div className="floating-assistant" data-testid="floating-assistant">
      {open ? (
        <section id="assistant-dialog" className="assistant-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="assistant-title">
          <header className="assistant-header">
            <div className="assistant-heading">
              <span className="assistant-icon" aria-hidden="true"><Bot /></span>
              <div><h2 id="assistant-title">Hari's Portfolio Assistant</h2><p>Projects, experience, skills, and AI work.</p></div>
            </div>
            <button type="button" className="assistant-close" onClick={close} aria-label="Close portfolio assistant"><X aria-hidden="true" /></button>
          </header>
          <div className="assistant-conversation" aria-live="polite" aria-busy={isLoading}>
            <div className="assistant-message assistant-message-bot"><Sparkles aria-hidden="true" /><span>{intro}</span></div>
            {messages.map((message, index) => message.role === "user" ? (
              <div className="assistant-message assistant-message-user" key={`${message.text}-${index}`}>{message.text}</div>
            ) : (
              <div className="assistant-response" key={`${message.result.answer}-${index}`}>
                <p>{message.result.answer}</p>
                {message.result.destination ? <a className="assistant-destination" href={message.result.destination.href}>{message.result.destination.label}</a> : null}
                <div className="assistant-follow-ups" aria-label="Suggested follow-up questions">
                  {message.result.suggestions.slice(0, 3).map((suggestion) => suggestion.href ? <a key={suggestion.label} href={suggestion.href}>{suggestion.label}</a> : <button key={suggestion.label} type="button" onClick={() => ask(suggestion.query)} disabled={isLoading}>{suggestion.label}</button>)}
                </div>
              </div>
            ))}
            {isLoading && <div className="assistant-message assistant-message-bot"><Sparkles aria-hidden="true" /><span>Thinking...</span></div>}
          </div>
          {messages.length === 0 ? <div className="assistant-starters" aria-label="Suggested portfolio questions">{suggestions.map((question) => <button key={question} type="button" onClick={() => ask(question)} disabled={isLoading}><MessageSquareText aria-hidden="true" />{question}</button>)}</div> : null}
          <form className="assistant-form" onSubmit={(event) => { event.preventDefault(); ask(input); }}>
            <label className="sr-only" htmlFor="portfolio-question">Ask about the portfolio</label>
            <input ref={inputRef} id="portfolio-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Hari's work" maxLength={500} autoComplete="off" disabled={isLoading} />
            <button type="submit" aria-label="Ask portfolio assistant" disabled={isLoading}><Send aria-hidden="true" /></button>
          </form>
        </section>
      ) : null}
      <button ref={triggerRef} type="button" className="assistant-trigger" aria-label="Ask about my work" aria-expanded={open} aria-controls="assistant-dialog" title="Ask about my work" onClick={() => setOpen((value) => !value)}><Bot aria-hidden="true" /></button>
    </div>
  );
}
