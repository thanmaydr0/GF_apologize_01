/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary: Soft blush pinks
                primary: {
                    50: '#FFE9EF',
                    100: '#FFBCCD',
                    200: '#FC809F',
                    300: '#F85C86',
                    400: '#F2386D',
                    500: '#E91E63',
                },
                // Secondary: Earthy warm tones
                secondary: {
                    50: '#F5F0EC',
                    100: '#E4D7CF',
                    200: '#D1C1B5',
                    300: '#BBAB9B',
                    400: '#A69381',
                    500: '#8A6B52',
                },
                // Accent: Sage green for growth
                accent: {
                    50: '#DED7B1',
                    100: '#C8D4C9',
                    200: '#B0C4B1',
                    300: '#98B499',
                    400: '#7FA481',
                    500: '#6B9369',
                    rose: '#A26769',
                },
                // Base colors for backgrounds
                cream: '#FDF8F5',
                blush: '#FFF5F7',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.5s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
                'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '14%': { transform: 'scale(1.15)' },
                    '28%': { transform: 'scale(1)' },
                    '42%': { transform: 'scale(1.15)' },
                    '70%': { transform: 'scale(1)' },
                },
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
                'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
                'romantic': '0 4px 20px rgba(252, 128, 159, 0.15)',
                'romantic-lg': '0 10px 40px rgba(252, 128, 159, 0.2)',
            },
            backgroundImage: {
                'gradient-romantic': 'linear-gradient(135deg, #FFE9EF 0%, #FFF5F7 50%, #F5F0EC 100%)',
                'gradient-warm': 'linear-gradient(135deg, #F5F0EC 0%, #E4D7CF 100%)',
                'gradient-sage': 'linear-gradient(135deg, #DED7B1 0%, #B0C4B1 100%)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
}
