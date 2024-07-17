/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            white: '#fff',
            black: '#4F0E65',
            pink: '#FD4C8C',
            lightPurple: {
                1: '#DBBEEA',
                2: '#EDB6F4',
                3: '#E7BEF1',
                4: '#F7D6FB',
            },
        },
        extend: {
            backgroundImage: {
                mainPageBg: "url('@assets/png/mainPageBg.png')",
                whitePink:
                    'linear-gradient(to bottom left,rgba(255, 231, 239, 1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
                hotPink:
                    'linear-gradient(to bottom left,rgba(249,151,236,1) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(249,151,236,1) 100%)',
            },

            aspectRatio: {
                layout: '1.8 / 1',
                layout2: '9.4 / 1',
            },

            fontFamily: {
                barlow: ['Barlow Condensed', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
