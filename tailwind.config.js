/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#D70F62",

          secondary: "#ec4899",

          accent: "#151515",

          neutral: "#151515",

          "base-100": "#ffffff",

          info: "#ffffff",

          success: "#ffffff",

          warning: "#ffffff",

          error: "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
