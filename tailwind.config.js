/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsla(84, 100%, 50%, 1)",
        secondary: "hsla(72, 98%, 65%, 1)",
        success: "hsla(150, 87%, 41%, 1)",
        error: "hsla(349, 92%, 48%, 1)",
        notify: "hsla(37, 100%, 50%, 1)",
        text: {
          default: "hsla(0, 0%, 100%, 1)",
          secondary: "hsla(0, 0%, 41%, 1)",
        },
        link: {
          default: "hsla(84, 100%, 50%, 1)",
          visited: "hsla(86, 100%, 43%, 1)",
        },
        icon: {
          default: "hsla(0, 0%, 96%, 1)",
          secondary: "hsla(0, 0%, 41%, 1)",
        },
        bg: "hsla(0, 0%, 7%, 1)",
        "item-bg": "hsla(0, 0%, 11%, 1)",
        "bg-secondary": "hsla(0, 0%, 100%, 0.08)",
        "bg-secondary-hover": "hsla(0, 0%, 100%, 0.1)",
        "bg-secondary-active": "hsla(0, 0%, 100%, 0.14)",
        rating: "hsla(50, 100%, 50%, 1)",
        warning: "hsla(37, 100%, 50%, 0.24)",
        divider: "hsla(0, 0%, 100%, 0.12)",
        border: "hsla(0, 0%, 100%, 0.12)",
        "border-hover": "hsla(0, 0%, 100%, 0.24)",
        "border-active": "hsla(0, 0%, 100%, 0.48)",
        "border-focus": "hsla(0, 0%, 100%, 0.24)",
      },
    },
  },
  plugins: [],
};
