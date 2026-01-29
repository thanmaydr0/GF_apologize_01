import React from 'react'
import { motion } from 'framer-motion'

// ============================================
// TYPES
// ============================================
interface HeroPotatoProps {
    /** Size in pixels (height, width scales proportionally) */
    size?: number
    /** Custom className */
    className?: string
    /** Enable floating animation */
    animated?: boolean
    /** Accessibility label */
    ariaLabel?: string
}

// ============================================
// HERO POTATO COMPONENT
// ============================================
export const HeroPotato: React.FC<HeroPotatoProps> = ({
    size = 200,
    className = '',
    animated = true,
    ariaLabel = 'Cute potato character with heart',
}) => {
    const Wrapper = animated ? motion.svg : 'svg'

    const animationProps = animated ? {
        animate: {
            y: [0, -10, 0],
        },
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    } : {}

    return (
        <Wrapper
            viewBox="0 0 200 180"
            width={size}
            height={size * 0.9}
            className={className}
            role="img"
            aria-label={ariaLabel}
            {...animationProps}
        >
            <title>{ariaLabel}</title>
            <desc>A kawaii-style potato character with blushing cheeks and sparkly eyes, with a floating heart nearby</desc>

            {/* Gradient definitions */}
            <defs>
                <linearGradient id="heroPotatoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5E6D3" />
                    <stop offset="50%" stopColor="#E8D4B8" />
                    <stop offset="100%" stopColor="#C4A574" />
                </linearGradient>

                <linearGradient id="heroPotatoShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C4A574" />
                    <stop offset="100%" stopColor="#A08050" />
                </linearGradient>

                <radialGradient id="blushGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFBCCD" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFBCCD" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="eyeShine" cx="30%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#3D3028" />
                </radialGradient>

                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Shadow */}
            <ellipse
                cx="100"
                cy="165"
                rx="60"
                ry="12"
                fill="rgba(61, 48, 40, 0.1)"
            />

            {/* Main potato body */}
            <motion.ellipse
                cx="100"
                cy="95"
                rx="75"
                ry="65"
                fill="url(#heroPotatoGradient)"
                stroke="#C4A574"
                strokeWidth="2"
                animate={animated ? {
                    scaleY: [1, 0.98, 1],
                    scaleX: [1, 1.01, 1],
                } : {}}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ transformOrigin: '100px 95px' }}
            />

            {/* Potato texture spots */}
            <circle cx="55" cy="75" r="6" fill="#D4C4A4" opacity="0.4" />
            <circle cx="140" cy="110" r="5" fill="#D4C4A4" opacity="0.3" />
            <circle cx="70" cy="120" r="4" fill="#D4C4A4" opacity="0.35" />

            {/* Left eye */}
            <g>
                <ellipse cx="75" cy="85" rx="12" ry="14" fill="#3D3028" />
                <ellipse cx="75" cy="85" rx="10" ry="12" fill="url(#eyeShine)" />
                <circle cx="72" cy="80" r="4" fill="white" />
                <motion.circle
                    cx="78"
                    cy="88"
                    r="2"
                    fill="white"
                    opacity="0.6"
                    animate={animated ? { opacity: [0.4, 0.8, 0.4] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </g>

            {/* Right eye */}
            <g>
                <ellipse cx="125" cy="85" rx="12" ry="14" fill="#3D3028" />
                <ellipse cx="125" cy="85" rx="10" ry="12" fill="url(#eyeShine)" />
                <circle cx="122" cy="80" r="4" fill="white" />
                <motion.circle
                    cx="128"
                    cy="88"
                    r="2"
                    fill="white"
                    opacity="0.6"
                    animate={animated ? { opacity: [0.4, 0.8, 0.4] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
            </g>

            {/* Blush - left cheek */}
            <ellipse cx="50" cy="105" rx="15" ry="10" fill="url(#blushGradient)" />

            {/* Blush - right cheek */}
            <ellipse cx="150" cy="105" rx="15" ry="10" fill="url(#blushGradient)" />

            {/* Happy smile */}
            <path
                d="M75 115 Q100 140 125 115"
                stroke="#3D3028"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
            />

            {/* Little arms */}
            <motion.path
                d="M30 95 Q15 85 10 95 Q5 105 15 108"
                stroke="#C4A574"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                animate={animated ? { rotate: [0, 15, 0] } : {}}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ transformOrigin: '30px 95px' }}
            />
            <motion.path
                d="M170 95 Q185 85 190 95 Q195 105 185 108"
                stroke="#C4A574"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                animate={animated ? { rotate: [0, -15, 0] } : {}}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ transformOrigin: '170px 95px' }}
            />

            {/* Floating heart */}
            <motion.g
                filter="url(#softGlow)"
                animate={animated ? {
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                } : {}}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ transformOrigin: '165px 40px' }}
            >
                <path
                    d="M165 50 
             C165 45 160 35 150 35 
             C140 35 135 45 135 50 
             C135 60 150 75 165 85 
             C180 75 195 60 195 50 
             C195 45 190 35 180 35 
             C170 35 165 45 165 50Z"
                    fill="#FC809F"
                />
                <ellipse cx="152" cy="45" rx="5" ry="4" fill="white" opacity="0.4" />
            </motion.g>

            {/* Sparkles */}
            <motion.g
                animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {/* Sparkle 1 */}
                <path
                    d="M45 50 L47 55 L52 57 L47 59 L45 64 L43 59 L38 57 L43 55 Z"
                    fill="#FFD700"
                />
                {/* Sparkle 2 */}
                <path
                    d="M155 55 L156 58 L159 59 L156 60 L155 63 L154 60 L151 59 L154 58 Z"
                    fill="#FFD700"
                    opacity="0.8"
                />
                {/* Sparkle 3 */}
                <motion.path
                    d="M30 70 L31 73 L34 74 L31 75 L30 78 L29 75 L26 74 L29 73 Z"
                    fill="#FFBCCD"
                    animate={animated ? { scale: [0.8, 1.2, 0.8] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ transformOrigin: '30px 74px' }}
                />
            </motion.g>
        </Wrapper>
    )
}

HeroPotato.displayName = 'HeroPotato'

export default HeroPotato
