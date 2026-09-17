import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const QUOTE_PAIRS: [RegExp, string][] = [
  [/["“«]([^"”»\n]{1,60}?)["”»]/g, `\`$1\``],
  [/(?<![\w])'([^'\n]{1,60}?)'(?![\w])/g, `\`$1\``],
  [/(?<!\\)\\([^\\\n]{1,60}?)\\(?!\\)/g, `\`$1\``],
];

function highlightQuotedSpans(text: string): string {
  for (const [pattern, replacement] of QUOTE_PAIRS) {
    text = text.replace(pattern, (match, inner: string) => {
      if (!inner.trim() || inner.includes("`")) return match;
      const trimmed = inner.trim();
      if (trimmed.length < 2) return match;
      return `\`${trimmed}\``;
    });
  }
  return text;
}

export default function Markdown({ text }: { text: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {highlightQuotedSpans(text)}
      </ReactMarkdown>
    </div>
  );
}