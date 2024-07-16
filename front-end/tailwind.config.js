/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                whitePink:
                    'linear-gradient(to bottom left,rgba(255, 231, 239, 1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
            },
        },
    },
    plugins: [],
};
