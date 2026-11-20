import { readFile } from "node:fs/promises";
import { cacheLife } from "next/cache";
import path from "node:path";
import postcss from "postcss";
import sanitizeHtml from "sanitize-html";
import { compile } from "tailwindcss";

const STYLE_TAG = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const CLASS_ATTR = /\sclass="([^"]*)"/gi;
const ROOT_SELECTOR = /^(html|body|:root|:host)(?=$|[\s.#:[>+~,])/;
const THEME_AT_RULES = new Set(["theme", "utility", "custom-variant"]);

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "picture",
    "source",
    "figure",
    "figcaption",
    "svg",
    "path",
    "circle",
    "rect",
    "line",
    "polyline",
    "polygon",
    "g",
  ],
  allowedAttributes: {
    "*": ["class", "style", "id", "title", "role", "aria-*", "data-*"],
    a: ["href", "target", "rel"],
    img: ["src", "srcset", "alt", "width", "height", "loading"],
    source: ["srcset", "media", "type"],
    svg: ["viewbox", "xmlns", "width", "height", "fill", "stroke", "stroke-width"],
    path: ["d", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"],
    circle: ["cx", "cy", "r", "fill", "stroke"],
    rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke"],
    line: ["x1", "y1", "x2", "y2", "stroke"],
    polyline: ["points", "fill", "stroke"],
    polygon: ["points", "fill", "stroke"],
    g: ["fill", "stroke", "transform"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
    }),
  },
};

let tailwindInput: Promise<{ css: string; stylesheets: Map<string, string> }> | null = null;

async function loadTailwindInput() {
  const root = process.cwd();
  const globals = postcss.parse(await readFile(path.join(root, "src/app/globals.css"), "utf8"));
  const siteTheme = postcss
    .root({
      nodes: globals.nodes
        .filter((node) => node.type === "atrule" && THEME_AT_RULES.has(node.name))
        .map((node) => node.clone()),
    })
    .toString();

  const stylesheets = new Map<string, string>();
  for (const id of ["tailwindcss/theme.css", "tailwindcss/utilities.css"]) {
    stylesheets.set(id, await readFile(path.join(root, "node_modules", id), "utf8"));
  }

  return {
    css: `@import "tailwindcss/theme.css" layer(theme);\n@import "tailwindcss/utilities.css" layer(utilities);\n${siteTheme}`,
    stylesheets,
  };
}

async function tailwindCss(html: string) {
  const candidates = new Set<string>();
  for (const [, classes] of html.matchAll(CLASS_ATTR)) {
    classes.split(/\s+/).filter(Boolean).forEach((name) => candidates.add(name));
  }
  if (!candidates.size) return "";

  tailwindInput ??= loadTailwindInput();
  try {
    const { css, stylesheets } = await tailwindInput;
    const compiler = await compile(css, {
      base: process.cwd(),
      loadStylesheet: async (id, base) => ({ path: id, base, content: stylesheets.get(id) ?? "" }),
    });
    return compiler.build([...candidates]);
  } catch {
    tailwindInput = null;
    return "";
  }
}

function scopeCss(css: string, scope: string) {
  const root = postcss.parse(css);
  root.walkComments((comment) => {
    comment.remove();
  });
  root.walkAtRules((rule) => {
    if (rule.name === "import" || rule.name === "charset" || rule.name === "namespace") rule.remove();
  });
  root.walkRules((rule) => {
    let parent = rule.parent;
    while (parent && parent.type !== "root") {
      if (parent.type === "rule") return;
      if (parent.type === "atrule" && /keyframes$/i.test((parent as postcss.AtRule).name)) return;
      parent = parent.parent;
    }
    rule.selectors = rule.selectors.map((selector) => {
      const trimmed = selector.trim();
      return ROOT_SELECTOR.test(trimmed) ? trimmed.replace(ROOT_SELECTOR, `.${scope}`) : `.${scope} ${trimmed}`;
    });
  });
  root.walkDecls((decl) => {
    if (/javascript:|expression\(/i.test(decl.value)) decl.remove();
  });
  return root.toString().replace(/<\/style/gi, "");
}

function hash(text: string) {
  let value = 5381;
  for (let i = 0; i < text.length; i++) value = (value * 33) ^ text.charCodeAt(i);
  return (value >>> 0).toString(36);
}

/**
 * Sanitises an HTML embed and scopes its CSS. Cached because the result depends only on `source`,
 * and the work inside (file reads, PostCSS's random ids) would otherwise block prerendering.
 */
export async function prepareHtmlEmbed(source: string) {
  "use cache";
  cacheLife("max");

  const scope = `embed-${hash(source)}`;
  const styles: string[] = [];
  const markup = source.replace(STYLE_TAG, (_, css: string) => {
    styles.push(css);
    return "";
  });
  const html = sanitizeHtml(markup, SANITIZE_OPTIONS);

  let css = "";
  try {
    css = scopeCss([await tailwindCss(html), ...styles].join("\n"), scope);
  } catch {
    css = "";
  }

  return { scope, css, html };
}
