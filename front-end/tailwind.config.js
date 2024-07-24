import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            xs: { max: '767px' },
            sm: { min: '768px', max: '1023px' },
            md: { min: '1024px', max: '1279px' },
            lg: { min: '1280px', max: '1439px' },
            xl: '1920px',
        },
        colors: {
            white: '#fff',
            black: '#340544',
            pink: '#FD4C8C',
            lightPurple: {
                1: '#DBBEEA',
                2: '#EDB6F4',
                3: '#E7BEF1',
                4: '#F7D6FB',
                5: '#E5D1F9',
                6: '#FCB5F6',
            },
            transparent: 'transparent',
        },
        extend: {
            backgroundImage: {
                mainPageBg: "url('@assets/png/mainPageBg.png')",
                chatPageBg: "url('@assets/png/chatPageBg.png')",
                whitePink:
                    'linear-gradient(to bottom left,rgba(255, 231, 239, 1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
                hotPink:
                    'linear-gradient(to bottom left,rgba(249,151,236,1) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(249,151,236,1) 100%)',
                indyBlue:
                    'linear-gradient(to bottom left,rgba(167,162,229,1) 0%, rgba(255, 255, 255, 1) 50%, rgba(167,162,229,0) 100%)',
            },

            aspectRatio: {
                layout: '1.8 / 1',
                header: '14 / 1',
            },

            fontFamily: {
                barlow: ['Barlow Condensed', 'sans-serif'],
            },

            transitionProperty: {
                width: 'width',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
