/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-in": "bounce-in 1.2s both",
      },
      keyframes: {
        "bounce-in": {
          "0%, 20%, 40%, 60%, 80%, 100%": {
            "animation-timing-function":
              "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
          },
          "0%": {
            opacity: "0",
            transform: "translateY(100px)",
          },
          "60%": {
            opacity: "1",
            transform: "translateY(-20px)",
          },
          "80%": {
            transform: "translateY(10px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
