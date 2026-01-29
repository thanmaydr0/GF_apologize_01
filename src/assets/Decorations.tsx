import React from 'react'
import { motion } from 'framer-motion'

// ============================================
// TYPES
// ============================================
interface DecorativeElementProps {
    size?: number
    color?: string
    className?: string
    animated?: boolean
}

// ============================================
// HEART COMPONENT
// ============================================
export const Heart: React.FC<DecorativeElementProps & { filled?: boolean }> = ({
    size = 24,
    color = '#FC809F',
    className = '',
    animated = false,
    filled = true,
}) => {
    const Wrapper = animated ? motion.svg : 'svg'

    return (
        <Wrapper
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
            fill={filled ? color : 'none'}
            stroke={color}
            strokeWidth={filled ? 0 : 2}
            animate={animated ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
            aria-hidden="true"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </Wrapper>
    )
}

// ============================================
// SPARKLE COMPONENT
// ============================================
export const Sparkle: React.FC<DecorativeElementProps> = ({
    size = 20,
    color = '#FFD700',
    className = '',
    animated = true,
}) => {
    const Wrapper = animated ? motion.svg : 'svg'

    return (
        <Wrapper
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
            animate={animated ? {
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 15, -15, 0],
                opacity: [0.6, 1, 0.6]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
        >
            <path
                d="M12 2 L13.5 8 L20 9 L14 12.5 L16 19 L12 14.5 L8 19 L10 12.5 L4 9 L10.5 8 Z"
                fill={color}
            />
        </Wrapper>
    )
}

// ============================================
// FLORAL CORNER DECORATION
// ============================================
export const FloralCorner: React.FC<DecorativeElementProps & {
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}> = ({
    size = 100,
    color = '#FFBCCD',
    className = '',
    position = 'topLeft',
}) => {
        const rotations = {
            topLeft: 0,
            topRight: 90,
            bottomRight: 180,
            bottomLeft: 270,
        }

        return (
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                className={className}
                style={{ transform: `rotate(${rotations[position]}deg)` }}
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="floralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Main vine curve */}
                <path
                    d="M5 5 Q30 15 45 40 Q55 60 80 75"
                    stroke="url(#floralGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Leaves */}
                <ellipse cx="20" cy="12" rx="8" ry="4" fill={color} opacity="0.4" transform="rotate(-30 20 12)" />
                <ellipse cx="35" cy="28" rx="6" ry="3" fill={color} opacity="0.35" transform="rotate(-45 35 28)" />
                <ellipse cx="55" cy="55" rx="7" ry="3.5" fill={color} opacity="0.3" transform="rotate(-60 55 55)" />

                {/* Small flowers */}
                <circle cx="10" cy="8" r="4" fill={color} opacity="0.5" />
                <circle cx="28" cy="22" r="3" fill={color} opacity="0.4" />
                <circle cx="65" cy="68" r="3.5" fill={color} opacity="0.35" />

                {/* Dot accents */}
                <circle cx="15" cy="18" r="1.5" fill={color} opacity="0.6" />
                <circle cx="42" cy="38" r="1.5" fill={color} opacity="0.5" />
                <circle cx="72" cy="70" r="2" fill={color} opacity="0.4" />
            </svg>
        )
    }

// ============================================
// ELEGANT DIVIDER
// ============================================
export const ElegantDivider: React.FC<DecorativeElementProps & { variant?: 'simple' | 'hearts' | 'flourish' }> = ({
    size = 200,
    color = '#FFBCCD',
    className = '',
    variant = 'hearts',
}) => {
    if (variant === 'simple') {
        return (
            <svg
                viewBox="0 0 200 20"
                width={size}
                height={size * 0.1}
                className={className}
                aria-hidden="true"
            >
                <line x1="10" y1="10" x2="190" y2="10" stroke={color} strokeWidth="1" strokeLinecap="round" />
            </svg>
        )
    }

    if (variant === 'flourish') {
        return (
            <svg
                viewBox="0 0 200 30"
                width={size}
                height={size * 0.15}
                className={className}
                aria-hidden="true"
            >
                <path
                    d="M10 15 Q50 5 100 15 Q150 25 190 15"
                    stroke={color}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                />
                <circle cx="100" cy="15" r="3" fill={color} />
            </svg>
        )
    }

    // Default: hearts variant
    return (
        <svg
            viewBox="0 0 200 30"
            width={size}
            height={size * 0.15}
            className={className}
            aria-hidden="true"
        >
            {/* Left line */}
            <line x1="10" y1="15" x2="80" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" />

            {/* Center heart */}
            <path
                d="M100 22 C100 20 98 16 95 16 C92 16 90 19 90 21 C90 24 95 28 100 32 C105 28 110 24 110 21 C110 19 108 16 105 16 C102 16 100 20 100 22Z"
                fill={color}
                transform="scale(0.6) translate(67, -5)"
            />

            {/* Right line */}
            <line x1="120" y1="15" x2="190" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </svg>
    )
}

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================
export const FloatingParticles: React.FC<{
    count?: number
    type?: 'hearts' | 'sparkles' | 'mixed'
    className?: string
}> = ({
    count = 8,
    type = 'mixed',
    className = '',
}) => {
        const particles = [...Array(count)].map((_, i) => {
            const isHeart = type === 'hearts' || (type === 'mixed' && i % 2 === 0)

            return (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${10 + (i * (80 / count))}%`,
                        top: `${15 + (i % 3) * 25}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                >
                    {isHeart ? (
                        <Heart size={12 + Math.random() * 8} color="#FFBCCD" />
                    ) : (
                        <Sparkle size={10 + Math.random() * 6} color="#FFD700" />
                    )}
                </motion.div>
            )
        })

        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
                {particles}
            </div>
        )
    }

// ============================================
// EXPORTS
// ============================================
Heart.displayName = 'Heart'
Sparkle.displayName = 'Sparkle'
FloralCorner.displayName = 'FloralCorner'
ElegantDivider.displayName = 'ElegantDivider'
FloatingParticles.displayName = 'FloatingParticles'
