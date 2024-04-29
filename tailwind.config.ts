import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#feecdc",
        darkgrey: "#28293d",
        "darkgrey-600": "#1f1f2e",
        "darkgrey-400": "#3a3a4f",
        "darkgrey-100": "#4f4f6f",
        "darkgrey-50": "hsla(0,0%,100%,0.6)",
      },
    },
  },
  plugins: [require("@xpd/tailwind-3dtransforms")],
};
export default config;
