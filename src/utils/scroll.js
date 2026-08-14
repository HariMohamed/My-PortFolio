export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const configuredOffset = Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop,
  );
  const offset = Number.isFinite(configuredOffset) ? configuredOffset : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  });
}
