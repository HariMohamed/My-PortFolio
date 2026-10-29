import { homeSeo, siteName, siteUrl } from "./seo";

export { siteUrl };

export const defaultMetadata = homeSeo;

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

// Keeps the client-rendered head identical to what the static HTML already declares for the route.
export function setPageMetadata({ title, description, url, image = homeSeo.image, imageAlt = homeSeo.imageAlt, robots = "index, follow" }) {
  document.title = title;
  setMeta("name", "description", description);
  setMeta("name", "robots", robots);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:site_name", siteName);
  setMeta("property", "og:image", image);
  setMeta("property", "og:image:alt", imageAlt);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", image);
  setMeta("name", "twitter:image:alt", imageAlt);
  setCanonical(url);
}
