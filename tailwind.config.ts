import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "dark-900": "#050508",
                "dark-800": "#0a0a14",
                "dark-700": "#0f0f1e",
            },
            fontFamily: {
                display: ["Syne","sans-serif"],
                body:    ["DM Sans","sans-serif"],
                mono:    ["JetBrains Mono","monospace"],
            },
            animation: {
                float: "float 5s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%,100%": { transform:"translateY(0px)" },
                    "50%":     { transform:"translateY(-12px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
