/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components-new/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontWeight: {
        thin: "100",
      },
    },
    fontFamily: {
      inter: ["inter", "sans-serif"],
    },
    backgroundImage: {
      // 'image-content': "url('/bg-main.webp')"
      // 'image-content': "url('/bg-main.svg')"
      "image-content": "url('/bg-main.gif')",
      // 'image-content': "url('/bg-main.mp4')"
    },
    keyframes: {
      move: {
        "0%, 100%": { transform: "translateX(0)" },
        "50%": { transform: "translateX(30px)" },
      },
    },
    animation: {
      "move-left-right": "move 3s ease-in-out infinite",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
