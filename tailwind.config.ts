import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '1000': '1000ms',
      },
      transitionDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
};
export default config;

