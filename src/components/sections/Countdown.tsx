import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHeart } from 'react-icons/fa'

// ============================================
// TYPES
// ============================================
interface CountdownProps {
    /** Target date/time in ISO format or Date object */
    targetDate: string | Date
    /** Section ID for navigation */
    id?: string
    /** Custom heading text */
    heading?: string
    /** Custom subheading text */
    subheading?: string
    /** Message to display when countdown completes */
    completionMessage?: string
    /** Show circular progress rings */
    showProgress?: boolean
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
    total: number
}

// ============================================
// ANIMATED NUMBER COMPONENT
// ============================================
interface AnimatedNumberProps {
    value: number
    label: string
    max: number
    showProgress: boolean
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
    value,
    label,
    max,
    showProgress
}) => {
    const progress = ((max - value) / max) * 100
    const circumference = 2 * Math.PI * 45

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                {/* Progress ring */}
                {showProgress && (
                    <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        {/* Background ring */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255, 188, 205, 0.2)"
                            strokeWidth="3"
                        />
                        {/* Progress ring */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FC809F" />
                                <stop offset="100%" stopColor="#FFBCCD" />
                            </linearGradient>
                        </defs>
                    </svg>
                )}

                {/* Number container */}
                <div
                    className={`
            relative flex items-center justify-center
            ${showProgress ? 'w-24 h-24 md:w-28 md:h-28' : 'w-20 h-20 md:w-24 md:h-24'}
            bg-white/60 backdrop-blur-sm rounded-2xl shadow-romantic
            border border-white/50
          `}
                >
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={value}
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary-500 font-bold"
                            initial={{ y: -20, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {value.toString().padStart(2, '0')}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            {/* Label */}
            <span className="mt-3 text-sm md:text-base text-secondary-400 font-medium">
                {label}
            </span>
        </div>
    )
}

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
const FloatingHearts: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-primary-100"
                style={{
                    left: `${5 + (i * 8)}%`,
                    bottom: '-20px',
                    fontSize: `${12 + Math.random() * 12}px`,
                }}
                animate={{
                    y: [0, -400 - Math.random() * 200],
                    x: [0, (Math.random() - 0.5) * 100],
                    opacity: [0, 0.6, 0],
                    rotate: [0, (Math.random() - 0.5) * 60],
                }}
                transition={{
                    duration: 8 + Math.random() * 6,
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: 'easeOut',
                }}
            >
                <FaHeart />
            </motion.div>
        ))}
    </div>
)

// ============================================
// COMPLETION CELEBRATION
// ============================================
interface CelebrationProps {
    message: string
}

const Celebration: React.FC<CelebrationProps> = ({ message }) => (
    <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
    >
        {/* Confetti hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-2xl"
                    style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: '50%',
                    }}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{
                        y: [-100, 200],
                        x: [(Math.random() - 0.5) * 200],
                        rotate: [0, 360],
                        opacity: [1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 3,
                    }}
                >
                    {['💕', '✨', '🥔', '💖', '🌸'][i % 5]}
                </motion.span>
            ))}
        </div>

        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl md:text-8xl mb-6"
        >
            💕
        </motion.div>

        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary-500 mb-4">
            It's Time!
        </h3>

        <p className="text-lg md:text-xl text-secondary-400 max-w-md mx-auto">
            {message}
        </p>

        <motion.div
            className="mt-8 flex justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            {['🥔', '💕', '🥔'].map((emoji, i) => (
                <motion.span
                    key={i}
                    className="text-3xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                >
                    {emoji}
                </motion.span>
            ))}
        </motion.div>
    </motion.div>
)

// ============================================
// SEPARATOR DOT
// ============================================
const Separator: React.FC = () => (
    <div className="flex flex-col gap-2 mx-2 md:mx-4 self-center mb-8">
        <motion.div
            className="w-2 h-2 rounded-full bg-primary-200"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
            className="w-2 h-2 rounded-full bg-primary-200"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
        />
    </div>
)

// ============================================
// MAIN COUNTDOWN COMPONENT
// ============================================
export const Countdown: React.FC<CountdownProps> = ({
    targetDate,
    id = 'countdown',
    heading = "Until I Can Hold You Again",
    subheading = "Every second brings us closer",
    completionMessage = "The wait is over. I can't wait to see you! 💕",
    showProgress = true,
}) => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

    // Parse target date
    const target = useMemo(() => {
        return typeof targetDate === 'string' ? new Date(targetDate) : targetDate
    }, [targetDate])

    // Calculate time left
    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date()
        const difference = target.getTime() - now.getTime()

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            total: difference,
        }
    }

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft)
    const isComplete = timeLeft.total <= 0

    // Update countdown every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [target])

    return (
        <section
            id={id}
            ref={ref}
            className="relative py-20 md:py-32 px-6 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF5F7 50%, #FDF8F5 100%)',
            }}
            aria-label="Countdown to our next meeting"
        >
            {/* Floating hearts background */}
            <FloatingHearts />

            {/* Decorative gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-primary-100/30 blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-accent-100/30 blur-3xl" />

            <div className="relative max-w-4xl mx-auto">
                {/* Header */}
                <motion.header
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        className="text-4xl md:text-5xl mb-4"
                        animate={isComplete ? {} : { scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ⏰
                    </motion.div>

                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary-500 mb-4">
                        {heading}
                    </h2>

                    <p className="text-lg text-secondary-300 max-w-xl mx-auto">
                        {subheading}
                    </p>
                </motion.header>

                {/* Countdown or Celebration */}
                <AnimatePresence mode="wait">
                    {isComplete ? (
                        <Celebration key="celebration" message={completionMessage} />
                    ) : (
                        <motion.div
                            key="countdown"
                            className="flex justify-center items-start flex-wrap gap-4 md:gap-0"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <AnimatedNumber
                                value={timeLeft.days}
                                label="Days"
                                max={365}
                                showProgress={showProgress}
                            />

                            <Separator />

                            <AnimatedNumber
                                value={timeLeft.hours}
                                label="Hours"
                                max={24}
                                showProgress={showProgress}
                            />

                            <Separator />

                            <AnimatedNumber
                                value={timeLeft.minutes}
                                label="Minutes"
                                max={60}
                                showProgress={showProgress}
                            />

                            <Separator />

                            <AnimatedNumber
                                value={timeLeft.seconds}
                                label="Seconds"
                                max={60}
                                showProgress={showProgress}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom message */}
                {!isComplete && (
                    <motion.div
                        className="text-center mt-12 md:mt-16"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-secondary-300 italic">
                            I'm counting every moment until then 🥔💕
                        </p>

                        {/* Target date display */}
                        <p className="mt-4 text-sm text-secondary-200">
                            {target.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

Countdown.displayName = 'Countdown'

export default Countdown
