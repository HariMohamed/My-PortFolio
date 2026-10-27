/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
	extend: {
		colors: {
			bg: 'var(--color-bg)',
			surface: 'var(--color-surface)',
			'surface-2': 'var(--color-surface-strong)',
			text: 'var(--color-text-primary)',
			muted: 'var(--color-text-muted)',
			'accent-text': 'var(--color-accent-text)',
			'on-accent': 'var(--color-on-accent)',
			accent: 'var(--color-primary)',
			border: 'var(--border)',
			background: 'var(--background)',
			foreground: 'var(--foreground)',
			card: {
				DEFAULT: 'var(--card)',
				foreground: 'var(--card-foreground)'
			},
			popover: {
				DEFAULT: 'var(--popover)',
				foreground: 'var(--popover-foreground)'
			},
			primary: {
				DEFAULT: 'var(--primary)',
				foreground: 'var(--primary-foreground)'
			},
			secondary: {
				DEFAULT: 'var(--secondary)',
				foreground: 'var(--secondary-foreground)'
			},
			destructive: 'var(--destructive)',
			input: 'var(--input)',
			ring: 'var(--ring)',
			chart: {
				'1': 'var(--chart-1)',
				'2': 'var(--chart-2)',
				'3': 'var(--chart-3)',
				'4': 'var(--chart-4)',
				'5': 'var(--chart-5)'
			},
			sidebar: {
				DEFAULT: 'var(--sidebar)',
				foreground: 'var(--sidebar-foreground)',
				primary: 'var(--sidebar-primary)',
				'primary-foreground': 'var(--sidebar-primary-foreground)',
				accent: 'var(--sidebar-accent)',
				'accent-foreground': 'var(--sidebar-accent-foreground)',
				border: 'var(--sidebar-border)',
				ring: 'var(--sidebar-ring)'
			}
		},
		fontFamily: {
			display: [
				'Bebas Neue',
				'sans-serif'
			],
			body: [
				'Inter',
				'system-ui',
				'sans-serif'
			],
			mono: [
				'JetBrains Mono',
				'monospace'
			]
		},
		boxShadow: {
			glow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
};
