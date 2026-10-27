// Renders model output as React elements only (never innerHTML), so HTML-like text is shown as
// harmless text. Supported subset: **bold**, [text](url) links, "-"/"*" and "1." lists,
// paragraphs and line breaks. Tables are flattened to readable lines; headings lose their "#".
const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i;
const INLINE = /(\*\*[^*\n]+\*\*|\*[^*\s][^*\n]*\*|\[[^\]\n]+\]\([^)\s]+\))/g;

function renderInline(text, keyPrefix) {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (/^\*\*[^*\n]+\*\*$/.test(part)) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (/^\*[^*\s][^*\n]*\*$/.test(part)) return <em key={key}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]\n]+)\]\(([^)\s]+)\)$/);
    if (link) {
      if (!SAFE_URL.test(link[2])) return link[1];
      const external = /^https?:/i.test(link[2]);
      return <a key={key} href={link[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link[1]}</a>;
    }
    return part;
  });
}

function toBlocks(source) {
  // <br> inside a table row is a space (keeps the row on one line); elsewhere it is a line break.
  const lines = source.replace(/\r/g, "").split("\n").flatMap((line) => (line.trim().startsWith("|") ? line.replace(/<br\s*\/?>/gi, " ") : line.split(/<br\s*\/?>/i)));
  const blocks = [];
  let current = null;
  const push = (type, text) => {
    if (current && current.type === type) current.items.push(text);
    else { current = { type, items: [text] }; blocks.push(current); }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { current = null; continue; }
    if (line.startsWith("|")) {
      if (/^\|?[\s:|-]+\|?$/.test(line)) continue; // table separator row
      push("p", line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()).filter(Boolean).join(" · "));
      continue;
    }
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet) push("ul", bullet[1]);
    else if (numbered) push("ol", numbered[1]);
    else push("p", line.replace(/^#{1,6}\s+/, ""));
  }
  return blocks;
}

export default function ChatMessage({ text }) {
  return (
    <div className="assistant-text">
      {toBlocks(String(text ?? "")).map((block, b) => {
        if (block.type === "p") return <p key={b}>{block.items.map((item, i) => <span key={i}>{i > 0 ? <br /> : null}{renderInline(item, `${b}-${i}`)}</span>)}</p>;
        const List = block.type;
        return <List key={b}>{block.items.map((item, i) => <li key={i}>{renderInline(item, `${b}-${i}`)}</li>)}</List>;
      })}
    </div>
  );
}
