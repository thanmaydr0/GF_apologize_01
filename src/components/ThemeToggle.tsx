import React from 'react'
import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from './ThemeProvider'
import { useSound } from './SoundSystem'

export const ThemeToggle: React.FC = () => {
    const { isDark, toggleTheme } = useTheme()
    const { playSound } = useSound()

    const handleToggle = () => {
        playSound('click')
        toggleTheme()
    }

    return (
        <motion.button
            onClick={handleToggle}
            className={`
                fixed bottom-6 left-6 z-50
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-lg transition-colors
                ${isDark
                    ? 'bg-secondary-100 text-yellow-400'
                    : 'bg-secondary-500 text-yellow-200'}
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.div>
        </motion.button>
    )
}

export default ThemeToggle
