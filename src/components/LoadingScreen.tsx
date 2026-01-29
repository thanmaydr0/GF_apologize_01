import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// TYPES
// ============================================
interface LoadingScreenProps {
    /** Minimum time to show loading screen in ms */
    minDuration?: number
    /** Custom loading message */
    message?: string
    /** Callback when loading is complete */
    onComplete?: () => void
}

// ============================================
// ANIMATED POTATO
// ============================================
const AnimatedPotato: React.FC = () => (
    <motion.svg
        viewBox="0 0 100 85"
        className="w-24 h-20 md:w-32 md:h-28"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        {/* Potato body */}
        <motion.ellipse
            cx="50"
            cy="45"
            rx="40"
            ry="32"
            fill="url(#loadingPotatoGradient)"
            stroke="#C4A574"
            strokeWidth="2"
            animate={{
                scaleY: [1, 0.95, 1],
                scaleX: [1, 1.03, 1],
            }}
            transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />

        {/* Eyes - blinking */}
        <motion.g
            animate={{
                scaleY: [1, 0.1, 1],
            }}
            transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 3,
            }}
        >
            <circle cx="38" cy="42" r="4" fill="#3D3028" />
            <circle cx="39" cy="40" r="1.5" fill="white" />
            <circle cx="62" cy="42" r="4" fill="#3D3028" />
            <circle cx="63" cy="40" r="1.5" fill="white" />
        </motion.g>

        {/* Blush */}
        <ellipse cx="28" cy="52" rx="7" ry="4" fill="#FFBCCD" opacity="0.6" />
        <ellipse cx="72" cy="52" rx="7" ry="4" fill="#FFBCCD" opacity="0.6" />

        {/* Smile */}
        <motion.path
            d="M40 58 Q50 66 60 58"
            stroke="#3D3028"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{
                d: [
                    "M40 58 Q50 66 60 58",
                    "M40 58 Q50 68 60 58",
                    "M40 58 Q50 66 60 58",
                ],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />

        {/* Floating hearts */}
        <motion.text
            x="75"
            y="25"
            fontSize="12"
            animate={{
                y: [25, 18, 25],
                opacity: [0.5, 1, 0.5],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
            }}
        >
            💕
        </motion.text>

        <defs>
            <linearGradient id="loadingPotatoGradient" x1="10" y1="15" x2="90" y2="75">
                <stop offset="0%" stopColor="#E8D4B8" />
                <stop offset="100%" stopColor="#C4A574" />
            </linearGradient>
        </defs>
    </motion.svg>
)

// ============================================
// LOADING DOTS
// ============================================
const LoadingDots: React.FC = () => (
    <span className="inline-flex gap-1 ml-1">
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary-300"
                animate={{
                    y: [0, -4, 0],
                    opacity: [0.4, 1, 0.4],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                }}
            />
        ))}
    </span>
)

// ============================================
// MAIN LOADING SCREEN
// ============================================
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
    minDuration = 2000,
    message = "Preparing something special",
    onComplete,
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, minDuration / 10)

        // Minimum duration timer
        const timer = setTimeout(() => {
            setIsLoading(false)
            onComplete?.()
        }, minDuration)

        return () => {
            clearTimeout(timer)
            clearInterval(progressInterval)
        }
    }, [minDuration, onComplete])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.6, ease: 'easeOut' },
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center
                     bg-gradient-to-b from-cream via-blush to-cream"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.min(100, Math.round(progress))}
                    aria-label="Loading website"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Floating elements */}
                        {[...Array(8)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute text-primary-100 text-2xl"
                                style={{
                                    left: `${10 + i * 12}%`,
                                    top: `${20 + (i % 3) * 25}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.2, 0.4, 0.2],
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 4 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            >
                                {['💕', '✨', '🥔'][i % 3]}
                            </motion.span>
                        ))}
                    </div>

                    {/* Main content */}
                    <motion.div
                        className="relative flex flex-col items-center"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Animated potato */}
                        <AnimatedPotato />

                        {/* Message */}
                        <motion.p
                            className="mt-8 text-lg text-secondary-400 flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {message}
                            <LoadingDots />
                        </motion.p>

                        {/* Progress bar */}
                        <motion.div
                            className="mt-6 w-48 h-1.5 bg-primary-100 rounded-full overflow-hidden"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 192 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary-300 to-primary-400 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min(100, progress)}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            className="mt-4 text-sm text-secondary-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            for you 💕
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

LoadingScreen.displayName = 'LoadingScreen'

export default LoadingScreen
