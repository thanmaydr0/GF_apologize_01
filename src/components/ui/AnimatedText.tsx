import React, { useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// ============================================
// TYPES
// ============================================
type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'slideLeft' | 'slideRight' | 'typewriter' | 'wordReveal' | 'charReveal'
type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span'

interface AnimatedTextProps {
    children: string
    as?: TextElement
    animation?: AnimationType
    delay?: number
    duration?: number
    staggerDelay?: number
    className?: string
    once?: boolean
    threshold?: number
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeVariants: Record<string, Variants> = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    fadeInUp: {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
        hidden: { opacity: 0, y: -24 },
        visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: -32 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: 32 },
        visible: { opacity: 1, x: 0 },
    },
}

const containerVariants: Variants = {
    hidden: {},
    visible: (staggerDelay: number) => ({
        transition: {
            staggerChildren: staggerDelay,
        },
    }),
}

const charVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

const wordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
        rotateX: 45,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

// ============================================
// COMPONENT
// ============================================
export const AnimatedText: React.FC<AnimatedTextProps> = ({
    children,
    as: Tag = 'p',
    animation = 'fadeInUp',
    delay = 0,
    duration = 0.6,
    staggerDelay = 0.03,
    className = '',
    once = true,
    threshold = 0.3,
}) => {
    const { ref, inView } = useInView({
        threshold,
        triggerOnce: once,
    })

    // Parse text into words and characters
    const words = useMemo(() => children.split(' '), [children])
    const chars = useMemo(() => children.split(''), [children])

    // Simple fade animations
    if (['fadeIn', 'fadeInUp', 'fadeInDown', 'slideLeft', 'slideRight'].includes(animation)) {
        const MotionTag = motion[Tag] as typeof motion.p

        return (
            <MotionTag
                ref={ref}
                className={className}
                variants={fadeVariants[animation]}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{
                    duration,
                    delay,
                    ease: [0.4, 0, 0.2, 1],
                }}
            >
                {children}
            </MotionTag>
        )
    }

    // Word reveal animation
    if (animation === 'wordReveal') {
        const MotionTag = motion[Tag] as typeof motion.p

        return (
            <MotionTag
                ref={ref}
                className={`${className} overflow-hidden`}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={staggerDelay}
                style={{ perspective: 500 }}
                aria-label={children}
            >
                {words.map((word, i) => (
                    <motion.span
                        key={`${word}-${i}`}
                        className="inline-block mr-[0.25em] origin-bottom"
                        variants={wordVariants}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {word}
                    </motion.span>
                ))}
            </MotionTag>
        )
    }

    // Character reveal animation
    if (animation === 'charReveal') {
        const MotionTag = motion[Tag] as typeof motion.p

        return (
            <MotionTag
                ref={ref}
                className={className}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={staggerDelay}
                aria-label={children}
            >
                {chars.map((char, i) => (
                    <motion.span
                        key={`${char}-${i}`}
                        className="inline-block"
                        variants={charVariants}
                        style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                    >
                        {char}
                    </motion.span>
                ))}
            </MotionTag>
        )
    }

    // Typewriter animation
    if (animation === 'typewriter') {
        const MotionTag = motion[Tag] as typeof motion.p

        return (
            <MotionTag
                ref={ref}
                className={className}
                initial={{ opacity: 1 }}
                animate={inView ? 'visible' : 'hidden'}
                aria-label={children}
            >
                {chars.map((char, i) => (
                    <motion.span
                        key={`${char}-${i}`}
                        className="inline-block"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                            duration: 0.02,
                            delay: delay + i * 0.04,
                        }}
                        style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                    >
                        {char}
                    </motion.span>
                ))}
                {/* Cursor */}
                <motion.span
                    className="inline-block w-0.5 h-[1em] bg-primary-300 ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                    aria-hidden="true"
                />
            </MotionTag>
        )
    }

    // Fallback
    const MotionTag = motion[Tag] as typeof motion.p
    return (
        <MotionTag ref={ref} className={className}>
            {children}
        </MotionTag>
    )
}

AnimatedText.displayName = 'AnimatedText'

export default AnimatedText
