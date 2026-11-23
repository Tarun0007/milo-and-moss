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
        background: "#FAF8F3",
        foreground: "#252822",
        ivory: {
          DEFAULT: "#FAF8F3",
          50: "#FCFBF8",
          100: "#FAF8F3",
          200: "#F3EFE6",
          300: "#E9E2D2",
        },
        forest: {
          DEFAULT: "#23483B",
          50: "#F0F5F2",
          100: "#DCE7E1",
          200: "#B8CFC4",
          600: "#2B5848",
          700: "#23483B",
          800: "#1A362C",
          900: "#11241D",
        },
        sage: {
          DEFAULT: "#B9D5C4",
          light: "#E4EFE8",
          medium: "#A3C8B1",
          dark: "#6F9E82",
        },
        peach: {
          DEFAULT: "#F3C6B3",
          light: "#FAECE6",
          dark: "#E3A38A",
        },
        butter: {
          DEFAULT: "#F4E4A5",
          light: "#FAF4D6",
          dark: "#E5CF78",
        },
        dustyBlue: {
          DEFAULT: "#D8E5F0",
          light: "#EDF3F8",
          dark: "#ABC6DE",
        },
        lavender: {
          DEFAULT: "#E6DDF1",
          light: "#F4EFF9",
          dark: "#CDBEE0",
        },
        dark: {
          DEFAULT: "#252822",
          muted: "#7A807A",
          subtle: "#9CA19C",
        },
        border: {
          DEFAULT: "#E7E4DC",
          subtle: "#F0ECE3",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Outfit", "Plus Jakarta Sans", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"],
        serif: ["var(--font-serif)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 0.25rem 1.25rem -0.125rem rgba(35, 72, 59, 0.05)",
        float: "0 0.625rem 1.875rem -0.3125rem rgba(35, 72, 59, 0.08)",
        card: "0 0.125rem 0.75rem 0 rgba(37, 40, 34, 0.04)",
        dropdown: "0 0.75rem 2.5rem -0.375rem rgba(35, 72, 59, 0.12)",
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0rem)' },
          '50%': { transform: 'translateY(-0.625rem)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0rem)' },
          '50%': { transform: 'translateY(0.5rem)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
