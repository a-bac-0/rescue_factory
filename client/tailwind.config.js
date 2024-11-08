/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                xsss: '320px',
                xss: '480px',
                xs: '576px',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                customGreen: '#31442C',
            },
        },
    },
    plugins: [],
}
