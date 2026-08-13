/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-strong)",
        text: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-primary)",
        border: "var(--color-border)",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
