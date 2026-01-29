import React from 'react'
import { motion } from 'framer-motion'

// ============================================
// TYPES
// ============================================
export type PotatoEmotion = 'happy' | 'crying' | 'loving' | 'silly'

interface PotatoEmotionsProps {
    /** Which emotion to display */
    emotion: PotatoEmotion
    /** Size in pixels */
    size?: number
    /** Custom className */
    className?: string
    /** Enable animation */
    animated?: boolean
}

interface BasePotatoProps {
    size: number
    animated: boolean
    children: React.ReactNode
    ariaLabel: string
}

// ============================================
// BASE POTATO WRAPPER
// ============================================
const BasePotato: React.FC<BasePotatoProps> = ({ size, animated, children, ariaLabel }) => {
    const Wrapper = animated ? motion.svg : 'svg'

    return (
        <Wrapper
            viewBox="0 0 100 90"
            width={size}
            height={size * 0.9}
            role="img"
            aria-label={ariaLabel}
            animate={animated ? {
                scaleY: [1, 0.98, 1],
                scaleX: [1, 1.01, 1],
            } : {}}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <defs>
                <linearGradient id="emotionPotatoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5E6D3" />
                    <stop offset="50%" stopColor="#E8D4B8" />
                    <stop offset="100%" stopColor="#C4A574" />
                </linearGradient>
                <radialGradient id="emotionBlush" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFBCCD" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#FFBCCD" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Potato body */}
            <ellipse
                cx="50"
                cy="48"
                rx="40"
                ry="35"
                fill="url(#emotionPotatoGradient)"
                stroke="#C4A574"
                strokeWidth="1.5"
            />

            {/* Blush cheeks - always present */}
            <ellipse cx="25" cy="55" rx="8" ry="5" fill="url(#emotionBlush)" />
            <ellipse cx="75" cy="55" rx="8" ry="5" fill="url(#emotionBlush)" />

            {children}
        </Wrapper>
    )
}

// ============================================
// HAPPY POTATO
// ============================================
const HappyPotato: React.FC<{ size: number; animated: boolean }> = ({ size, animated }) => (
    <BasePotato size={size} animated={animated} ariaLabel="Happy potato with big smile">
        {/* Eyes - happy closed crescents */}
        <path
            d="M32 43 Q37 38 42 43"
            stroke="#3D3028"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />
        <path
            d="M58 43 Q63 38 68 43"
            stroke="#3D3028"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />

        {/* Big smile */}
        <path
            d="M35 58 Q50 75 65 58"
            stroke="#3D3028"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />

        {/* Sparkles */}
        <motion.g
            animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
        >
            <text x="12" y="30" fontSize="10">✨</text>
            <text x="82" y="25" fontSize="8">✨</text>
        </motion.g>
    </BasePotato>
)

// ============================================
// CRYING POTATO
// ============================================
const CryingPotato: React.FC<{ size: number; animated: boolean }> = ({ size, animated }) => (
    <BasePotato size={size} animated={animated} ariaLabel="Crying potato with tears">
        {/* Sad eyes */}
        <ellipse cx="37" cy="42" rx="5" ry="6" fill="#3D3028" />
        <circle cx="35" cy="40" r="2" fill="white" />
        <ellipse cx="63" cy="42" rx="5" ry="6" fill="#3D3028" />
        <circle cx="61" cy="40" r="2" fill="white" />

        {/* Sad eyebrows */}
        <path d="M28 34 L44 38" stroke="#3D3028" strokeWidth="2" strokeLinecap="round" />
        <path d="M72 34 L56 38" stroke="#3D3028" strokeWidth="2" strokeLinecap="round" />

        {/* Sad mouth */}
        <path
            d="M38 62 Q50 55 62 62"
            stroke="#3D3028"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
        />

        {/* Tears */}
        <motion.g
            animate={animated ? { y: [0, 10], opacity: [1, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
        >
            <ellipse cx="30" cy="52" rx="3" ry="4" fill="#87CEEB" opacity="0.7" />
            <ellipse cx="70" cy="52" rx="3" ry="4" fill="#87CEEB" opacity="0.7" />
        </motion.g>

        {/* Second tear wave */}
        <motion.g
            animate={animated ? { y: [0, 10], opacity: [1, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        >
            <ellipse cx="32" cy="55" rx="2" ry="3" fill="#87CEEB" opacity="0.5" />
            <ellipse cx="68" cy="55" rx="2" ry="3" fill="#87CEEB" opacity="0.5" />
        </motion.g>
    </BasePotato>
)

// ============================================
// LOVING POTATO (Heart Eyes)
// ============================================
const LovingPotato: React.FC<{ size: number; animated: boolean }> = ({ size, animated }) => (
    <BasePotato size={size} animated={animated} ariaLabel="Loving potato with heart eyes">
        {/* Heart eyes */}
        <motion.g
            animate={animated ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ transformOrigin: '37px 42px' }}
        >
            <path
                d="M37 46 C37 44 35 40 32 40 C29 40 27 43 27 45 C27 48 32 52 37 56 C42 52 47 48 47 45 C47 43 45 40 42 40 C39 40 37 44 37 46Z"
                fill="#FC809F"
                transform="scale(0.6) translate(25, 30)"
            />
        </motion.g>
        <motion.g
            animate={animated ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
            style={{ transformOrigin: '63px 42px' }}
        >
            <path
                d="M37 46 C37 44 35 40 32 40 C29 40 27 43 27 45 C27 48 32 52 37 56 C42 52 47 48 47 45 C47 43 45 40 42 40 C39 40 37 44 37 46Z"
                fill="#FC809F"
                transform="scale(0.6) translate(68, 30)"
            />
        </motion.g>

        {/* Happy smile */}
        <path
            d="M38 60 Q50 70 62 60"
            stroke="#3D3028"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
        />

        {/* Floating hearts */}
        <motion.text
            x="75"
            y="25"
            fontSize="12"
            animate={animated ? { y: [25, 18, 25], opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
        >
            💕
        </motion.text>
    </BasePotato>
)

// ============================================
// SILLY POTATO (Tongue Out)
// ============================================
const SillyPotato: React.FC<{ size: number; animated: boolean }> = ({ size, animated }) => (
    <BasePotato size={size} animated={animated} ariaLabel="Silly potato sticking tongue out">
        {/* Winking eye */}
        <path
            d="M30 42 Q37 37 44 42"
            stroke="#3D3028"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />

        {/* Open eye */}
        <ellipse cx="63" cy="42" rx="6" ry="7" fill="#3D3028" />
        <circle cx="61" cy="40" r="2.5" fill="white" />

        {/* Open mouth */}
        <ellipse cx="50" cy="62" rx="12" ry="8" fill="#3D3028" />

        {/* Tongue */}
        <motion.ellipse
            cx="50"
            cy="68"
            rx="8"
            ry="6"
            fill="#FF9999"
            animate={animated ? { scaleY: [1, 1.1, 1], y: [0, 2, 0] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
        />

        {/* Playful sweat drop */}
        <motion.path
            d="M78 35 Q80 28 82 35 Q80 40 78 35"
            fill="#87CEEB"
            animate={animated ? { y: [0, 3, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
    </BasePotato>
)

// ============================================
// MAIN COMPONENT
// ============================================
export const PotatoEmotions: React.FC<PotatoEmotionsProps> = ({
    emotion,
    size = 80,
    className = '',
    animated = true,
}) => {
    const emotionComponents: Record<PotatoEmotion, React.FC<{ size: number; animated: boolean }>> = {
        happy: HappyPotato,
        crying: CryingPotato,
        loving: LovingPotato,
        silly: SillyPotato,
    }

    const EmotionComponent = emotionComponents[emotion]

    return (
        <span className={className}>
            <EmotionComponent size={size} animated={animated} />
        </span>
    )
}

// Export individual emotions for direct use
export { HappyPotato, CryingPotato, LovingPotato, SillyPotato }

PotatoEmotions.displayName = 'PotatoEmotions'

export default PotatoEmotions
