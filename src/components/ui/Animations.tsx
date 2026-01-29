import React from 'react'
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion'

// ============================================
// TYPES
// ============================================
interface AnimatedCardProps extends HTMLMotionProps<'div'> {
    /** Children content */
    children: React.ReactNode
    /** Custom className */
    className?: string
    /** Lift amount on hover (px) */
    liftAmount?: number
    /** Enable glow effect on hover */
    glowOnHover?: boolean
    /** Disable all animations */
    disableAnimation?: boolean
}

// ============================================
// ANIMATED CARD COMPONENT
// ============================================
export const AnimatedCard: React.FC<AnimatedCardProps> = ({
    children,
    className = '',
    liftAmount = 4,
    glowOnHover = true,
    disableAnimation = false,
    ...motionProps
}) => {
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = !disableAnimation && !prefersReducedMotion

    return (
        <motion.div
            className={`
        relative rounded-2xl bg-white/80 backdrop-blur-sm
        border border-white/50 shadow-romantic
        transition-shadow duration-300
        ${glowOnHover ? 'hover:shadow-romantic-lg hover:border-primary-100' : ''}
        ${className}
      `}
            whileHover={
                shouldAnimate
                    ? {
                        y: -liftAmount,
                        transition: { duration: 0.25, ease: 'easeOut' },
                    }
                    : {}
            }
            whileTap={
                shouldAnimate
                    ? {
                        scale: 0.98,
                        transition: { duration: 0.1 },
                    }
                    : {}
            }
            {...motionProps}
        >
            {children}

            {/* Hover glow overlay */}
            {glowOnHover && shouldAnimate && (
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                        background:
                            'radial-gradient(ellipse at center, rgba(252, 128, 159, 0.08) 0%, transparent 70%)',
                    }}
                />
            )}
        </motion.div>
    )
}

AnimatedCard.displayName = 'AnimatedCard'

// ============================================
// SHIMMER TEXT COMPONENT
// ============================================
interface ShimmerTextProps {
    children: React.ReactNode
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
    /** Enable shimmer animation */
    shimmer?: boolean
    /** Shimmer duration in seconds */
    duration?: number
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({
    children,
    className = '',
    as: Component = 'span',
    shimmer = true,
    duration = 3,
}) => {
    const prefersReducedMotion = useReducedMotion()
    const MotionComponent = motion[Component]

    if (!shimmer || prefersReducedMotion) {
        return (
            <Component className={`text-gradient-romantic ${className}`}>
                {children}
            </Component>
        )
    }

    return (
        <MotionComponent
            className={`
        relative inline-block
        bg-gradient-to-r from-primary-300 via-accent-rose to-primary-300
        bg-clip-text text-transparent
        bg-[length:200%_100%]
        ${className}
      `}
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {children}
        </MotionComponent>
    )
}

ShimmerText.displayName = 'ShimmerText'

// ============================================
// CONFETTI COMPONENT
// ============================================
interface ConfettiPiece {
    id: number
    x: number
    y: number
    emoji: string
    rotation: number
    delay: number
}

interface ConfettiProps {
    pieces: ConfettiPiece[]
    isActive: boolean
}

export const Confetti: React.FC<ConfettiProps> = ({ pieces, isActive }) => {
    const prefersReducedMotion = useReducedMotion()

    if (!isActive || prefersReducedMotion || pieces.length === 0) {
        return null
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((piece) => (
                <motion.span
                    key={piece.id}
                    className="absolute text-2xl"
                    style={{
                        left: `${piece.x}%`,
                        top: `${piece.y}%`,
                    }}
                    initial={{
                        opacity: 1,
                        scale: 0,
                        rotate: 0,
                        y: 0,
                    }}
                    animate={{
                        opacity: [1, 1, 0],
                        scale: [0, 1.5, 1],
                        rotate: [0, piece.rotation, piece.rotation + 180],
                        y: [0, -100, 200],
                        x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                    }}
                    transition={{
                        duration: 2,
                        delay: piece.delay / 1000,
                        ease: 'easeOut',
                    }}
                >
                    {piece.emoji}
                </motion.span>
            ))}
        </div>
    )
}

Confetti.displayName = 'Confetti'

// ============================================
// HEART BURST COMPONENT
// ============================================
interface HeartBurstProps {
    /** Is the burst active */
    isActive: boolean
    /** Position X (relative to parent) */
    x?: number
    /** Position Y (relative to parent) */
    y?: number
    /** Number of hearts */
    count?: number
    /** Callback when animation completes */
    onComplete?: () => void
}

export const HeartBurst: React.FC<HeartBurstProps> = ({
    isActive,
    x = 50,
    y = 50,
    count = 8,
    onComplete,
}) => {
    const prefersReducedMotion = useReducedMotion()

    if (!isActive || prefersReducedMotion) {
        return null
    }

    const hearts = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2
        const distance = 50 + Math.random() * 30

        return {
            id: i,
            endX: Math.cos(angle) * distance,
            endY: Math.sin(angle) * distance,
            size: 12 + Math.random() * 8,
            delay: i * 30,
        }
    })

    return (
        <div
            className="absolute pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            {hearts.map((heart) => (
                <motion.span
                    key={heart.id}
                    className="absolute text-primary-300"
                    style={{ fontSize: heart.size }}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [1, 1, 0],
                        scale: [0, 1.2, 0.8],
                        x: heart.endX,
                        y: heart.endY,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: heart.delay / 1000,
                        ease: 'easeOut',
                    }}
                    onAnimationComplete={() => {
                        if (heart.id === count - 1 && onComplete) {
                            onComplete()
                        }
                    }}
                >
                    ❤️
                </motion.span>
            ))}
        </div>
    )
}

HeartBurst.displayName = 'HeartBurst'

// ============================================
// PULSE INDICATOR COMPONENT
// ============================================
interface PulseIndicatorProps {
    size?: number
    color?: string
    className?: string
}

export const PulseIndicator: React.FC<PulseIndicatorProps> = ({
    size = 12,
    color = '#FC809F',
    className = '',
}) => {
    const prefersReducedMotion = useReducedMotion()

    return (
        <span className={`relative inline-flex ${className}`}>
            {!prefersReducedMotion && (
                <motion.span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: color }}
                    animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            )}
            <span
                className="relative inline-flex rounded-full"
                style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                }}
            />
        </span>
    )
}

PulseIndicator.displayName = 'PulseIndicator'

// ============================================
// SKELETON LOADER COMPONENT
// ============================================
interface SkeletonProps {
    width?: string | number
    height?: string | number
    rounded?: 'sm' | 'md' | 'lg' | 'full'
    className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    rounded = 'md',
    className = '',
}) => {
    const prefersReducedMotion = useReducedMotion()
    const roundedClasses = {
        sm: 'rounded',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        full: 'rounded-full',
    }

    return (
        <motion.div
            className={`bg-secondary-100 ${roundedClasses[rounded]} ${className}`}
            style={{ width, height }}
            animate={
                prefersReducedMotion
                    ? {}
                    : {
                        opacity: [0.5, 0.8, 0.5],
                    }
            }
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    )
}

Skeleton.displayName = 'Skeleton'

// ============================================
// CHECKMARK ANIMATION COMPONENT
// ============================================
interface AnimatedCheckmarkProps {
    isVisible: boolean
    size?: number
    color?: string
    className?: string
}

export const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({
    isVisible,
    size = 40,
    color = '#4CAF50',
    className = '',
}) => {
    const prefersReducedMotion = useReducedMotion()

    if (!isVisible) return null

    return (
        <motion.svg
            className={className}
            viewBox="0 0 50 50"
            width={size}
            height={size}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 200 }}
        >
            <motion.circle
                cx="25"
                cy="25"
                r="23"
                fill="none"
                stroke={color}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
            />
            <motion.path
                d="M14 27 L22 35 L36 18"
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={
                    prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.3, delay: 0.4, ease: 'easeOut' }
                }
            />
        </motion.svg>
    )
}

AnimatedCheckmark.displayName = 'AnimatedCheckmark'
