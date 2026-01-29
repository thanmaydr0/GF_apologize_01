import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRedo, FaHeart, FaShareAlt } from 'react-icons/fa'
import { puns, getRandomPun, type Pun, type PunCategory } from '../../data/puns'
import { Button } from '../ui'

// ============================================
// TYPES
// ============================================
interface PotatoPunsProps {
    id?: string
    maxCards?: number
}

// ============================================
// CUTE POTATO CHARACTERS (SVG)
// ============================================
const PotatoCharacters: React.FC<{ variant: number; className?: string }> = ({
    variant,
    className = ''
}) => {
    const characters = [
        // Happy Potato
        <svg key="happy" viewBox="0 0 80 70" className={className}>
            <ellipse cx="40" cy="38" rx="32" ry="28" fill="url(#potato1)" stroke="#C4A574" strokeWidth="1.5" />
            <circle cx="30" cy="35" r="4" fill="#3D3028" />
            <circle cx="31" cy="33" r="1.5" fill="white" />
            <circle cx="50" cy="35" r="4" fill="#3D3028" />
            <circle cx="51" cy="33" r="1.5" fill="white" />
            <path d="M35 48 Q40 54 45 48" stroke="#3D3028" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="25" cy="42" rx="6" ry="4" fill="#FFBCCD" opacity="0.5" />
            <ellipse cx="55" cy="42" rx="6" ry="4" fill="#FFBCCD" opacity="0.5" />
            <defs>
                <linearGradient id="potato1" x1="10" y1="10" x2="70" y2="66">
                    <stop offset="0%" stopColor="#E8D4B8" />
                    <stop offset="100%" stopColor="#C4A574" />
                </linearGradient>
            </defs>
        </svg>,

        // Winking Potato
        <svg key="wink" viewBox="0 0 80 70" className={className}>
            <ellipse cx="40" cy="38" rx="32" ry="28" fill="url(#potato2)" stroke="#C4A574" strokeWidth="1.5" />
            <circle cx="30" cy="35" r="4" fill="#3D3028" />
            <circle cx="31" cy="33" r="1.5" fill="white" />
            <path d="M46 35 Q50 33 54 35" stroke="#3D3028" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M35 48 Q40 54 45 48" stroke="#3D3028" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="25" cy="42" rx="6" ry="4" fill="#FFBCCD" opacity="0.5" />
            <ellipse cx="55" cy="42" rx="6" ry="4" fill="#FFBCCD" opacity="0.5" />
            <defs>
                <linearGradient id="potato2" x1="10" y1="10" x2="70" y2="66">
                    <stop offset="0%" stopColor="#E8D4B8" />
                    <stop offset="100%" stopColor="#C4A574" />
                </linearGradient>
            </defs>
        </svg>,

        // Love Eyes Potato
        <svg key="love" viewBox="0 0 80 70" className={className}>
            <ellipse cx="40" cy="38" rx="32" ry="28" fill="url(#potato3)" stroke="#C4A574" strokeWidth="1.5" />
            <text x="26" y="40" fontSize="12">❤️</text>
            <text x="46" y="40" fontSize="12">❤️</text>
            <path d="M35 50 Q40 55 45 50" stroke="#3D3028" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="25" cy="45" rx="6" ry="4" fill="#FFBCCD" opacity="0.6" />
            <ellipse cx="55" cy="45" rx="6" ry="4" fill="#FFBCCD" opacity="0.6" />
            <defs>
                <linearGradient id="potato3" x1="10" y1="10" x2="70" y2="66">
                    <stop offset="0%" stopColor="#E8D4B8" />
                    <stop offset="100%" stopColor="#C4A574" />
                </linearGradient>
            </defs>
        </svg>,

        // Shy Potato
        <svg key="shy" viewBox="0 0 80 70" className={className}>
            <ellipse cx="40" cy="38" rx="32" ry="28" fill="url(#potato4)" stroke="#C4A574" strokeWidth="1.5" />
            <path d="M26 33 Q30 30 34 33" stroke="#3D3028" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M46 33 Q50 30 54 33" stroke="#3D3028" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="48" r="3" fill="#FC809F" />
            <ellipse cx="25" cy="40" rx="8" ry="5" fill="#FFBCCD" opacity="0.7" />
            <ellipse cx="55" cy="40" rx="8" ry="5" fill="#FFBCCD" opacity="0.7" />
            <defs>
                <linearGradient id="potato4" x1="10" y1="10" x2="70" y2="66">
                    <stop offset="0%" stopColor="#E8D4B8" />
                    <stop offset="100%" stopColor="#C4A574" />
                </linearGradient>
            </defs>
        </svg>,
    ]

    return characters[variant % characters.length]
}

// ============================================
// FLIP CARD COMPONENT
// ============================================
interface PunCardProps {
    pun: Pun
    index: number
    onShare?: (pun: Pun) => void
}

const PunCard: React.FC<PunCardProps> = ({ pun, index, onShare }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const handleFlip = () => setIsFlipped(!isFlipped)

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation()
        onShare?.(pun)
    }

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLiked(!isLiked)
    }

    const categoryColors: Record<PunCategory, string> = {
        romantic: 'from-primary-100 to-primary-50',
        sweet: 'from-accent-100 to-accent-50',
        silly: 'from-secondary-100 to-secondary-50',
    }

    const categoryBorders: Record<PunCategory, string> = {
        romantic: 'border-primary-200',
        sweet: 'border-accent-200',
        silly: 'border-secondary-200',
    }

    return (
        <motion.div
            className="perspective-1000 cursor-pointer h-64 md:h-72"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            onClick={handleFlip}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            aria-label={isFlipped ? 'Show setup' : 'Reveal punchline'}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front of Card */}
                <div
                    className={`
            absolute inset-0 rounded-3xl p-6
            bg-gradient-to-br ${categoryColors[pun.category]}
            border-2 ${categoryBorders[pun.category]}
            shadow-romantic
            flex flex-col items-center justify-center text-center
            backface-hidden
          `}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <motion.div
                        className="w-16 h-16 mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                        <PotatoCharacters variant={index} className="w-full h-full" />
                    </motion.div>

                    <p className="font-serif text-lg md:text-xl text-secondary-500 leading-relaxed">
                        {pun.setup}
                    </p>

                    <motion.p
                        className="mt-4 text-sm text-secondary-300"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Tap to reveal 💕
                    </motion.p>
                </div>

                {/* Back of Card */}
                <div
                    className={`
            absolute inset-0 rounded-3xl p-6
            bg-gradient-to-br from-primary-200 to-primary-100
            border-2 border-primary-300
            shadow-romantic-lg
            flex flex-col items-center justify-center text-center
            backface-hidden
          `}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <span className="text-4xl mb-3">{pun.emoji}</span>

                    <p className="font-serif text-xl md:text-2xl text-secondary-500 leading-relaxed font-medium">
                        {pun.punchline}
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-6">
                        <motion.button
                            onClick={handleLike}
                            className={`
                p-2 rounded-full transition-colors
                ${isLiked ? 'bg-primary-300 text-white' : 'bg-white/50 text-secondary-400'}
              `}
                            whileTap={{ scale: 0.9 }}
                            aria-label={isLiked ? 'Unlike' : 'Like this pun'}
                        >
                            <FaHeart className={isLiked ? 'animate-heartbeat' : ''} />
                        </motion.button>

                        <motion.button
                            onClick={handleShare}
                            className="p-2 rounded-full bg-white/50 text-secondary-400 hover:bg-white/70 transition-colors"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Share this pun"
                        >
                            <FaShareAlt />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

// ============================================
// CATEGORY FILTER TABS
// ============================================
interface CategoryTabsProps {
    activeCategory: PunCategory | 'all'
    onCategoryChange: (category: PunCategory | 'all') => void
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
    const categories: { key: PunCategory | 'all'; label: string; emoji: string }[] = [
        { key: 'all', label: 'All', emoji: '🥔' },
        { key: 'romantic', label: 'Romantic', emoji: '💕' },
        { key: 'sweet', label: 'Sweet', emoji: '🌸' },
        { key: 'silly', label: 'Silly', emoji: '😄' },
    ]

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
                <motion.button
                    key={cat.key}
                    onClick={() => onCategoryChange(cat.key)}
                    className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all
            ${activeCategory === cat.key
                            ? 'bg-primary-200 text-secondary-500 shadow-romantic'
                            : 'bg-white/60 text-secondary-400 hover:bg-white/80'}
          `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="mr-1">{cat.emoji}</span>
                    {cat.label}
                </motion.button>
            ))}
        </div>
    )
}

// ============================================
// RANDOM PUN DISPLAY
// ============================================
const RandomPunDisplay: React.FC = () => {
    const [currentPun, setCurrentPun] = useState<Pun>(getRandomPun())
    const [isRevealed, setIsRevealed] = useState(false)

    const handleNewPun = () => {
        setIsRevealed(false)
        setTimeout(() => {
            setCurrentPun(getRandomPun())
        }, 200)
    }

    return (
        <motion.div
            className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-8 md:p-10 mb-12 text-center shadow-romantic-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <h3 className="font-serif text-2xl text-secondary-500 mb-6">
                ✨ Random Pun Generator ✨
            </h3>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPun.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6"
                >
                    <p className="font-serif text-xl md:text-2xl text-secondary-500 mb-3">
                        {currentPun.setup}
                    </p>

                    <AnimatePresence>
                        {isRevealed && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="font-serif text-2xl md:text-3xl text-primary-400 font-medium"
                            >
                                {currentPun.punchline}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap justify-center gap-3">
                {!isRevealed ? (
                    <Button onClick={() => setIsRevealed(true)} variant="primary">
                        Reveal Punchline 💕
                    </Button>
                ) : (
                    <Button onClick={handleNewPun} variant="secondary" leftIcon={<FaRedo />}>
                        Another Pun!
                    </Button>
                )}
            </div>
        </motion.div>
    )
}

// ============================================
// MAIN POTATO PUNS COMPONENT
// ============================================
export const PotatoPuns: React.FC<PotatoPunsProps> = ({
    id = 'puns',
    maxCards = 12,
}) => {
    const [activeCategory, setActiveCategory] = useState<PunCategory | 'all'>('all')
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    const filteredPuns = activeCategory === 'all'
        ? puns.slice(0, maxCards)
        : puns.filter(p => p.category === activeCategory).slice(0, maxCards)

    const handleShare = useCallback(async (pun: Pun) => {
        const text = `${pun.setup} ${pun.punchline} 🥔💕`

        if (navigator.share) {
            try {
                await navigator.share({ text })
            } catch {
                // User cancelled or error
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(text)
            // Could add a toast notification here
        }
    }, [])

    return (
        <section
            id={id}
            ref={ref}
            className="relative py-20 md:py-32 px-6 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #FFF5F7 0%, #FDF8F5 50%, #F5F0EC 100%)',
            }}
            aria-label="Potato puns and jokes"
        >
            {/* Decorative background potatoes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10" aria-hidden="true">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-6xl"
                        style={{
                            left: `${10 + (i * 12)}%`,
                            top: `${10 + (i % 3) * 30}%`,
                        }}
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    >
                        🥔
                    </motion.div>
                ))}
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <motion.span
                        className="text-5xl md:text-6xl block mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    >
                        🥔
                    </motion.span>

                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary-500 mb-4">
                        A Few Potato Puns
                    </h2>

                    <p className="text-lg text-secondary-300 max-w-xl mx-auto">
                        Because what's love without a little laughter?
                        <br />
                        <span className="text-primary-400">Tap each card to reveal the punchline! 💕</span>
                    </p>
                </motion.div>

                {/* Random Pun Generator */}
                <RandomPunDisplay />

                {/* Category Filter */}
                <CategoryTabs
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                {/* Pun Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPuns.map((pun, index) => (
                            <PunCard
                                key={pun.id}
                                pun={pun}
                                index={index}
                                onShare={handleShare}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom message */}
                <motion.p
                    className="text-center text-secondary-300 mt-12 italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    P.S. I spent way too much time thinking of these...
                    <span className="not-italic">🥔💕</span>
                </motion.p>
            </div>
        </section>
    )
}

PotatoPuns.displayName = 'PotatoPuns'

export default PotatoPuns
