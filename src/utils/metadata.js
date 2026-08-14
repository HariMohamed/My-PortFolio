export const siteUrl = "https://harimohamedrizq.vercel.app";

export const defaultMetadata = {
  title: "Hari Mohamed Rizq | Full-Stack Developer & AI Integration Engineer",
  description:
    "Hari Mohamed Rizq — Full-Stack Developer & AI Integration Engineer. Building web applications, SaaS platforms, and AI-powered systems.",
  url: `${siteUrl}/`,
};

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
}

export function setPageMetadata({ title, description, url }) {
  document.title = title;
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image:alt", `${title} preview`);
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image:alt", `${title} preview`);
  setCanonical(url);
}
