import React, { useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { AnimatedText } from '../ui'

// ============================================
// TYPES
// ============================================
interface FloatingParticle {
    id: number
    x: number
    y: number
    size: number
    delay: number
    duration: number
    type: 'heart' | 'sparkle' | 'star'
}

interface HeroProps {
    nextSectionId?: string
}

// ============================================
// KAWAII POTATO SVG COMPONENT
// ============================================
const KawaiiPotato: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Cute kawaii potato character with a shy, loving expression"
        role="img"
    >
        {/* Potato Body - Soft organic shape */}
        <ellipse
            cx="100"
            cy="95"
            rx="75"
            ry="65"
            fill="url(#potatoGradient)"
            stroke="#C4A574"
            strokeWidth="2"
        />

        {/* Potato Spots/Freckles */}
        <circle cx="55" cy="75" r="6" fill="#D4B896" opacity="0.6" />
        <circle cx="145" cy="85" r="5" fill="#D4B896" opacity="0.5" />
        <circle cx="130" cy="120" r="4" fill="#D4B896" opacity="0.4" />
        <circle cx="65" cy="115" r="5" fill="#D4B896" opacity="0.5" />

        {/* Blush Cheeks */}
        <ellipse cx="60" cy="100" rx="15" ry="10" fill="#FFBCCD" opacity="0.6" />
        <ellipse cx="140" cy="100" rx="15" ry="10" fill="#FFBCCD" opacity="0.6" />

        {/* Left Eye */}
        <ellipse cx="75" cy="85" rx="10" ry="12" fill="#3D3028" />
        <ellipse cx="77" cy="82" rx="4" ry="5" fill="white" />

        {/* Right Eye */}
        <ellipse cx="125" cy="85" rx="10" ry="12" fill="#3D3028" />
        <ellipse cx="127" cy="82" rx="4" ry="5" fill="white" />

        {/* Shy/Happy Mouth */}
        <path
            d="M90 115 Q100 125 110 115"
            stroke="#3D3028"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
        />

        {/* Little Heart above potato */}
        <motion.g
            animate={{ y: [-2, 2, -2], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <path
                d="M100 25 C100 20 95 15 90 15 C82 15 82 25 82 25 C82 32 100 45 100 45 C100 45 118 32 118 25 C118 25 118 15 110 15 C105 15 100 20 100 25 Z"
                fill="#FC809F"
            />
        </motion.g>

        {/* Gradients */}
        <defs>
            <linearGradient id="potatoGradient" x1="25" y1="30" x2="175" y2="160">
                <stop offset="0%" stopColor="#E8D4B8" />
                <stop offset="50%" stopColor="#D4BC96" />
                <stop offset="100%" stopColor="#C4A574" />
            </linearGradient>
        </defs>
    </svg>
)

// ============================================
// FLOATING PARTICLES
// ============================================
const FloatingParticles: React.FC = () => {
    // Generate random particles
    const particles = useMemo<FloatingParticle[]>(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 12 + 8,
            delay: Math.random() * 5,
            duration: Math.random() * 4 + 6,
            type: (['heart', 'sparkle', 'star'] as const)[Math.floor(Math.random() * 3)],
        }))
    }, [])

    const renderParticle = (particle: FloatingParticle) => {
        if (particle.type === 'heart') {
            return (
                <FaHeart
                    style={{ fontSize: particle.size }}
                    className="text-primary-200"
                />
            )
        }
        if (particle.type === 'sparkle') {
            return (
                <span style={{ fontSize: particle.size }} className="text-accent-200">
                    ✨
                </span>
            )
        }
        return (
            <span style={{ fontSize: particle.size }} className="text-primary-100">
                ⭐
            </span>
        )
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.6, 0.4, 0.6, 0],
                        scale: [0.5, 1, 0.8, 1, 0.5],
                        y: [0, -30, -20, -40, -60],
                        x: [0, 10, -5, 15, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {renderParticle(particle)}
                </motion.div>
            ))}
        </div>
    )
}

// ============================================
// SCROLL INDICATOR
// ============================================
const ScrollIndicator: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <motion.button
        onClick={onClick}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-4 rounded-full p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to next section"
    >
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
        >
            <span className="text-sm text-secondary-300 font-medium">Scroll down</span>
            <div className="w-6 h-10 border-2 border-primary-200 rounded-full flex justify-center pt-2">
                <motion.div
                    className="w-1.5 h-1.5 bg-primary-300 rounded-full"
                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>
        </motion.div>
    </motion.button>
)

// ============================================
// MAIN HERO COMPONENT
// ============================================
export const Hero: React.FC<HeroProps> = ({ nextSectionId = 'content' }) => {
    // Parallax effect using scroll
    const { scrollY } = useScroll()
    const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
    const contentY = useTransform(scrollY, [0, 500], [0, 50])
    const opacity = useTransform(scrollY, [0, 400], [1, 0])

    // Smooth scroll to next section
    const scrollToNext = useCallback(() => {
        const nextSection = document.getElementById(nextSectionId)
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' })
        } else {
            // Fallback: scroll down one viewport height
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
            })
        }
    }, [nextSectionId])

    return (
        <section
            className="relative min-h-screen md:h-screen flex flex-col items-center justify-center overflow-hidden"
            aria-label="Welcome section"
        >
            {/* Parallax Background Gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary-50 via-blush to-cream"
                style={{ y: backgroundY }}
                aria-hidden="true"
            />

            {/* Decorative Gradient Orbs */}
            <motion.div
                className="absolute top-10 left-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-40"
                style={{ y: backgroundY }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                aria-hidden="true"
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 bg-accent-200 rounded-full blur-3xl opacity-30"
                style={{ y: backgroundY }}
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity }}
                aria-hidden="true"
            />

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                style={{ y: contentY, opacity }}
            >
                {/* Kawaii Potato Character */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                        delay: 0.2
                    }}
                    whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
                    className="mb-6 md:mb-8 cursor-pointer mx-auto w-40 h-36 md:w-56 md:h-48"
                >
                    <KawaiiPotato className="w-full h-full drop-shadow-lg" />
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-secondary-500 mb-4 md:mb-6">
                        Hey Potato{' '}
                        <span className="inline-block">
                            <motion.span
                                className="inline-block"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                🥔
                            </motion.span>
                            <motion.span
                                className="inline-block"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                            >
                                💕
                            </motion.span>
                        </span>
                    </h1>
                </motion.div>

                {/* Subheading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                    <AnimatedText
                        as="p"
                        animation="fadeIn"
                        delay={1.2}
                        className="text-lg sm:text-xl md:text-2xl text-secondary-300 font-sans leading-relaxed max-w-xl mx-auto"
                    >
                        I made something special for you...
                    </AnimatedText>
                </motion.div>

                {/* Gentle call-to-action hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="mt-8 md:mt-10 text-sm md:text-base text-secondary-300/70 italic"
                >
                    Take your time, there's no rush 💝
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <ScrollIndicator onClick={scrollToNext} />

            {/* Bottom fade for smooth transition */}
            <div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent pointer-events-none"
                aria-hidden="true"
            />
        </section>
    )
}

Hero.displayName = 'Hero'

export default Hero
