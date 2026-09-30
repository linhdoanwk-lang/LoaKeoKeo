import sanitizeHtml from "sanitize-html";

const allowedTags = ["h2", "h3", "p", "strong", "em", "ul", "ol", "li", "br", "a"];

export function sanitizeRichText(value: string) {
  if (!value.trim()) return "";

  const source = /<\/?[a-z][\s\S]*>/i.test(value)
    ? value
    : value
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
        .join("");

  return sanitizeHtml(source, {
    allowedTags,
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noreferrer noopener" }, true),
    },
  });
}

export function richTextToPlainText(value: string) {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}
