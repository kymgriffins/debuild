import type { Config } from "tailwindcss";

export default {
  // darkMode is handled via CSS custom properties
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // Modern 2025 features
    supports: {
      'container-queries': 'container-type: inline-size',
    },
    extend: {
      colors: {
        border: "#E5E5E7", // Apple's subtle border color
        input: "#F2F2F7", // Light input background
        ring: "#007AFF", // Apple's blue accent
        background: "#FFFFFF", // Pure white background
        foreground: "#1D1D1F", // Apple's dark text

        // Primary - Apple's blue
        primary: {
          DEFAULT: "#007AFF",
          foreground: "#FFFFFF",
          hover: "#0051D5", // Slightly darker blue for hover
        },

        // Secondary - Clean grayscale
        secondary: {
          DEFAULT: "#F2F2F7",
          foreground: "#1D1D1F",
        },

        destructive: {
          DEFAULT: "#FF3B30", // Apple's red
          foreground: "#FFFFFF",
        },

        muted: {
          DEFAULT: "#F9F9F9",
          foreground: "#86868B",
        },

        accent: {
          DEFAULT: "#007AFF",
          foreground: "#FFFFFF",
        },

        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1D1D1F",
        },

        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1D1D1F",
          border: "#E5E5E7",
        },

        // Apple-inspired additional colors
        apple: {
          gray: {
            100: "#FCFCFC",
            200: "#F2F2F7",
            300: "#E5E5E7",
            400: "#D1D1D6",
            500: "#86868B",
            600: "#1D1D1F",
          },
          blue: {
            400: "#007AFF",
            500: "#0051D5",
            600: "#003BA6",
          },
          red: {
            500: "#FF3B30",
          },
          green: {
            500: "#28CD41",
          },
        },

        // Section backgrounds
        section: {
          white: "#FFFFFF",
          light: "#F9F9F9",
          dark: "#1D1D1F",
        },

        // Text colors
        text: {
          primary: "#1D1D1F", // Dark charcoal
          secondary: "#424245", // Medium gray
          tertiary: "#86868B", // Light gray
          inverse: "#FFFFFF", // White for dark backgrounds
          accent: "#007AFF", // Blue accent
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
