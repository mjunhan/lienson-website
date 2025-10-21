import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0EA5E9",
          dark: "#0B7FC0",
          light: "#38BDF8",
        },
      },
      boxShadow: {
        soft: "0 25px 40px -20px rgba(14, 165, 233, 0.25)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at 20% 20%, rgba(14,165,233,0.15), transparent 55%)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(71 85 105)",
            "--tw-prose-headings": "rgb(15 23 42)",
            "--tw-prose-links": "rgb(14 165 233)",
            "--tw-prose-bold": "rgb(15 23 42)",
            "--tw-prose-quotes": "rgb(100 116 139)",
          },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
  },
  plugins: [typography],
};

export default config;
