import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRedo, FaCheck, FaEye } from 'react-icons/fa'
import { scratchCards, type ScratchCardData } from '../../data/scratchCards'
import { Button } from '../ui'

// ============================================
// TYPES
// ============================================
interface ScratchCardsProps {
    id?: string
}

interface CardState {
    scratched: number // 0-100 percentage
    revealed: boolean
}

// ============================================
// CONSTANTS
// ============================================
const REVEAL_THRESHOLD = 50 // Lower threshold for easier reveal
const SCRATCH_RADIUS = 30 // Larger brush
const CARD_WIDTH = 280
const CARD_HEIGHT = 200

// ============================================
// SINGLE SCRATCH CARD COMPONENT
// ============================================
interface ScratchCardProps {
    card: ScratchCardData
    state: CardState
    onScratch: (percentage: number) => void
    onReveal: () => void
    onReset: () => void
}

const ScratchCard: React.FC<ScratchCardProps> = ({
    card,
    state,
    onScratch,
    onReveal,
    onReset,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isDrawing = useRef(false)
    const lastPoint = useRef<{ x: number; y: number } | null>(null)

    // Initialize canvas with scratch surface
    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        canvas.width = CARD_WIDTH
        canvas.height = CARD_HEIGHT

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT)
        gradient.addColorStop(0, '#D4C5B3')
        gradient.addColorStop(0.5, '#E0D5C5')
        gradient.addColorStop(1, '#D4C5B3')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)

        // Add subtle pattern
        ctx.fillStyle = 'rgba(160, 140, 120, 0.15)'
        for (let x = 0; x < CARD_WIDTH; x += 20) {
            for (let y = 0; y < CARD_HEIGHT; y += 20) {
                ctx.beginPath()
                ctx.arc(x, y, 2, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Add potato emojis
        ctx.font = '24px serif'
        ctx.fillStyle = 'rgba(180, 160, 140, 0.3)'
        ctx.fillText('🥔', 30, 50)
        ctx.fillText('🥔', CARD_WIDTH - 60, CARD_HEIGHT - 40)
        ctx.fillText('💕', CARD_WIDTH / 2 - 15, CARD_HEIGHT / 2)

        // Add shimmer
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.beginPath()
        ctx.ellipse(CARD_WIDTH * 0.3, CARD_HEIGHT * 0.25, 60, 30, -0.4, 0, Math.PI * 2)
        ctx.fill()

        // Add instruction text
        ctx.font = 'bold 14px Inter, sans-serif'
        ctx.fillStyle = 'rgba(90, 70, 50, 0.8)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('👆 Swipe to reveal!', CARD_WIDTH / 2, CARD_HEIGHT / 2 - 30)
        ctx.font = '12px Inter, sans-serif'
        ctx.fillStyle = 'rgba(90, 70, 50, 0.5)'
        ctx.fillText('or tap Peek below', CARD_WIDTH / 2, CARD_HEIGHT / 2 + 45)

        ctx.font = '13px Inter, sans-serif'
        ctx.fillStyle = 'rgba(90, 70, 50, 0.5)'
        ctx.fillText(card.title, CARD_WIDTH / 2, CARD_HEIGHT / 2 + 10)
    }, [card.title])

    // Initialize canvas on mount and reset
    useEffect(() => {
        if (!state.revealed) {
            initCanvas()
        }
    }, [state.revealed, initCanvas])

    // Calculate scratch percentage
    const calculateScratchPercentage = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return 0

        const ctx = canvas.getContext('2d')
        if (!ctx) return 0

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        let transparentPixels = 0
        const totalPixels = pixels.length / 4

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparentPixels++
            }
        }

        return Math.round((transparentPixels / totalPixels) * 100)
    }, [])

    // Scratch at position
    const scratch = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.globalCompositeOperation = 'destination-out'

        // Draw scratch circle
        ctx.beginPath()
        ctx.arc(x, y, SCRATCH_RADIUS, 0, Math.PI * 2)
        ctx.fill()

        // Draw line from last point for smooth scratching
        if (lastPoint.current) {
            ctx.lineWidth = SCRATCH_RADIUS * 2
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
            ctx.lineTo(x, y)
            ctx.stroke()
        }

        lastPoint.current = { x, y }

        // Calculate and update percentage
        const percentage = calculateScratchPercentage()
        onScratch(percentage)

        // Check if revealed
        if (percentage >= REVEAL_THRESHOLD && !state.revealed) {
            onReveal()
        }
    }, [calculateScratchPercentage, onScratch, onReveal, state.revealed])

    // Get position from event
    const getPosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return null

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        if ('touches' in e) {
            const touch = e.touches[0]
            return {
                x: (touch.clientX - rect.left) * scaleX,
                y: (touch.clientY - rect.top) * scaleY,
            }
        } else {
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY,
            }
        }
    }, [])

    // Event handlers
    const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        isDrawing.current = true
        lastPoint.current = null
        const pos = getPosition(e)
        if (pos) scratch(pos.x, pos.y)
    }, [getPosition, scratch])

    const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current) return
        e.preventDefault()
        const pos = getPosition(e)
        if (pos) scratch(pos.x, pos.y)
    }, [getPosition, scratch])

    const handleEnd = useCallback(() => {
        isDrawing.current = false
        lastPoint.current = null
    }, [])

    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden shadow-romantic bg-white"
            style={{ width: '100%', aspectRatio: '7/5' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: state.revealed ? 1 : 1.02 }}
        >
            {/* Revealed content layer */}
            <div
                className={`
          absolute inset-0 p-5 flex flex-col
          bg-white
        `}
            >
                <div className="mb-2">
                    <span className="text-2xl">{card.emoji}</span>
                </div>

                <h4 className="font-serif text-lg text-gray-800 mb-3 font-semibold">
                    {card.title}
                </h4>

                <p className="text-base text-gray-700 leading-relaxed flex-1 overflow-auto">
                    {card.hiddenMessage}
                </p>

                {state.revealed && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={onReset}
                        className="mt-3 px-4 py-2 rounded-full bg-primary-100 hover:bg-primary-200 
                       text-primary-500 hover:text-white text-sm font-medium
                       flex items-center gap-2 self-center transition-all shadow-sm"
                    >
                        <FaRedo className="text-xs" /> Try Another Card
                    </motion.button>
                )}
            </div>

            {/* Scratch surface layer */}
            <AnimatePresence>
                {!state.revealed && (
                    <motion.div
                        className="absolute inset-0 flex flex-col"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Canvas scratch area */}
                        <canvas
                            ref={canvasRef}
                            className="w-full flex-1 cursor-crosshair touch-none"
                            onMouseDown={handleStart}
                            onMouseMove={handleMove}
                            onMouseUp={handleEnd}
                            onMouseLeave={handleEnd}
                            onTouchStart={handleStart}
                            onTouchMove={handleMove}
                            onTouchEnd={handleEnd}
                            style={{ touchAction: 'none' }}
                        />

                        {/* Bottom bar with reveal button */}
                        <div className="bg-secondary-100/90 px-3 py-2 flex items-center justify-between">
                            {/* Progress */}
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-secondary-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary-300 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${state.scratched}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                                <span className="text-xs text-secondary-400">{state.scratched}%</span>
                            </div>

                            {/* Quick reveal button */}
                            <button
                                onClick={onReveal}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full
                           bg-primary-100 hover:bg-primary-200 text-primary-500 hover:text-white 
                           text-sm font-medium transition-all shadow-sm"
                            >
                                <FaEye className="text-xs" />
                                Peek Inside
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reveal celebration particles */}
            <AnimatePresence>
                {state.revealed && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute text-lg"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                }}
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{
                                    scale: [0, 1.5, 0],
                                    rotate: [0, 180],
                                    y: [-10, -30],
                                    opacity: [1, 0],
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.05,
                                }}
                            >
                                {['✨', '💕', '🥔'][i % 3]}
                            </motion.span>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ============================================
// MAIN SCRATCH CARDS SECTION
// ============================================
export const ScratchCards: React.FC<ScratchCardsProps> = ({ id = 'scratch-cards' }) => {
    const [cardStates, setCardStates] = useState<Record<number, CardState>>(() => {
        const initial: Record<number, CardState> = {}
        scratchCards.forEach(card => {
            initial[card.id] = { scratched: 0, revealed: false }
        })
        return initial
    })

    // Modal state for showing revealed card
    const [modalCard, setModalCard] = useState<ScratchCardData | null>(null)

    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    const revealedCount = Object.values(cardStates).filter(s => s.revealed).length
    const allRevealed = revealedCount === scratchCards.length

    const handleScratch = useCallback((cardId: number, percentage: number) => {
        setCardStates(prev => ({
            ...prev,
            [cardId]: { ...prev[cardId], scratched: percentage }
        }))
    }, [])

    const handleReveal = useCallback((cardId: number) => {
        setCardStates(prev => ({
            ...prev,
            [cardId]: { ...prev[cardId], revealed: true, scratched: 100 }
        }))
        // Open popup with full card content
        const card = scratchCards.find(c => c.id === cardId)
        if (card) setModalCard(card)
    }, [])

    const handleReset = useCallback((cardId: number) => {
        setCardStates(prev => ({
            ...prev,
            [cardId]: { scratched: 0, revealed: false }
        }))
    }, [])

    const handleResetAll = useCallback(() => {
        const reset: Record<number, CardState> = {}
        scratchCards.forEach(card => {
            reset[card.id] = { scratched: 0, revealed: false }
        })
        setCardStates(reset)
    }, [])

    const closeModal = () => setModalCard(null)

    return (
        <section
            id={id}
            ref={ref}
            className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-blush via-cream to-secondary-50"
            aria-label="Scratch cards with hidden messages"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.header
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        🎁
                    </motion.div>

                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary-500 mb-4">
                        Hidden <span className="text-gradient-romantic">Surprises</span>
                    </h2>

                    <p className="text-lg text-secondary-300 max-w-xl mx-auto">
                        Scratch each card to reveal a hidden message, or click "Reveal"
                    </p>
                </motion.header>

                {/* Progress */}
                <motion.div
                    className="flex justify-center items-center gap-4 mb-10"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                >
                    <div className="bg-white/60 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                        <FaCheck className={revealedCount > 0 ? 'text-accent-400' : 'text-secondary-200'} />
                        <span className="text-secondary-500 font-medium">
                            {revealedCount} / {scratchCards.length} revealed
                        </span>
                    </div>

                    {revealedCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleResetAll}
                            leftIcon={<FaRedo />}
                        >
                            Reset All
                        </Button>
                    )}
                </motion.div>

                {/* All Revealed Celebration */}
                <AnimatePresence>
                    {allRevealed && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gradient-to-r from-primary-100 via-accent-100 to-primary-100 
                         rounded-2xl p-6 mb-10 text-center shadow-romantic"
                        >
                            <span className="text-3xl mb-2 block">🎉</span>
                            <p className="font-serif text-xl text-secondary-500">
                                You found all the surprises!
                            </p>
                            <p className="text-secondary-400 mt-1">
                                But there's always more love where that came from 💕
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {scratchCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                        >
                            <ScratchCard
                                card={card}
                                state={cardStates[card.id]}
                                onScratch={(pct) => handleScratch(card.id, pct)}
                                onReveal={() => handleReveal(card.id)}
                                onReset={() => handleReset(card.id)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom message */}
                <motion.p
                    className="text-center text-secondary-300 mt-12 italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    Every card is something true I feel about you 🥔💕
                </motion.p>
            </div>

            {/* Modal Popup for revealed card */}
            <AnimatePresence>
                {modalCard && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={closeModal}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Modal content */}
                        <motion.div
                            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            {/* Header with emoji */}
                            <div className="bg-gradient-to-r from-primary-100 to-primary-50 px-6 py-5 text-center">
                                <span className="text-5xl">{modalCard.emoji}</span>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-serif text-xl text-gray-800 font-semibold mb-4 text-center">
                                    {modalCard.title}
                                </h3>

                                <p className="text-gray-700 text-base leading-relaxed text-center mb-6">
                                    {modalCard.hiddenMessage}
                                </p>

                                {/* Category badge */}
                                <div className="flex justify-center mb-4">
                                    <span className="px-3 py-1 bg-primary-50 text-primary-400 text-sm rounded-full capitalize">
                                        {modalCard.category}
                                    </span>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={closeModal}
                                    className="w-full py-3 bg-primary-200 hover:bg-primary-300 text-white rounded-full font-medium transition-colors"
                                >
                                    💕 Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

ScratchCards.displayName = 'ScratchCards'

export default ScratchCards
