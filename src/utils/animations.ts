import { useEffect, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from 'framer-motion'

// ============================================
// SCROLL ANIMATION HOOK
// ============================================
interface UseScrollAnimationOptions {
    /** Threshold for triggering animation (0-1) */
    threshold?: number
    /** Only animate once? */
    triggerOnce?: boolean
    /** Delay before animation starts (ms) */
    delay?: number
    /** Root margin for earlier/later triggering */
    rootMargin?: string
}

interface UseScrollAnimationReturn {
    ref: (node?: Element | null) => void
    inView: boolean
    hasAnimated: boolean
    shouldAnimate: boolean
}

export const useScrollAnimation = (
    options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
    const {
        threshold = 0.2,
        triggerOnce = true,
        delay = 0,
        rootMargin = '0px',
    } = options

    const prefersReducedMotion = useReducedMotion()
    const [hasAnimated, setHasAnimated] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(false)

    const { ref, inView } = useInView({
        threshold,
        triggerOnce,
        rootMargin,
    })

    useEffect(() => {
        if (inView && !hasAnimated) {
            if (delay > 0) {
                const timer = setTimeout(() => {
                    setShouldAnimate(true)
                    setHasAnimated(true)
                }, delay)
                return () => clearTimeout(timer)
            } else {
                setShouldAnimate(true)
                setHasAnimated(true)
            }
        }
    }, [inView, hasAnimated, delay])

    // If reduced motion, skip animation
    if (prefersReducedMotion) {
        return {
            ref,
            inView: true,
            hasAnimated: true,
            shouldAnimate: true,
        }
    }

    return {
        ref,
        inView,
        hasAnimated,
        shouldAnimate,
    }
}

// ============================================
// STAGGERED ANIMATION HOOK
// ============================================
interface UseStaggeredAnimationOptions {
    /** Number of items to animate */
    itemCount: number
    /** Delay between each item (ms) */
    staggerDelay?: number
    /** Base delay before first item (ms) */
    baseDelay?: number
    /** Threshold for triggering */
    threshold?: number
}

export const useStaggeredAnimation = (
    options: UseStaggeredAnimationOptions
) => {
    const {
        itemCount,
        staggerDelay = 100,
        baseDelay = 0,
        threshold = 0.2,
    } = options

    const { ref, inView } = useInView({ threshold, triggerOnce: true })
    const prefersReducedMotion = useReducedMotion()

    const getDelay = useCallback(
        (index: number) => {
            if (prefersReducedMotion) return 0
            return baseDelay + index * staggerDelay
        },
        [baseDelay, staggerDelay, prefersReducedMotion]
    )

    const getStaggerProps = useCallback(
        (index: number) => ({
            initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
            animate: inView
                ? { opacity: 1, y: 0 }
                : prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 },
            transition: {
                duration: 0.5,
                delay: getDelay(index) / 1000,
                ease: [0.4, 0, 0.2, 1],
            },
        }),
        [inView, getDelay, prefersReducedMotion]
    )

    return {
        ref,
        inView,
        getDelay,
        getStaggerProps,
        itemCount,
    }
}

// ============================================
// DEBOUNCED SCROLL HOOK
// ============================================
export const useDebouncedScroll = (delay = 50) => {
    const [scrollY, setScrollY] = useState(0)
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')

    useEffect(() => {
        let lastScrollY = window.scrollY
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY
                    setScrollY(currentScrollY)
                    setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
                    lastScrollY = currentScrollY
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [delay])

    return { scrollY, scrollDirection }
}

// ============================================
// CONFETTI HOOK
// ============================================
interface ConfettiPiece {
    id: number
    x: number
    y: number
    emoji: string
    rotation: number
    delay: number
}

export const useConfetti = (count = 20) => {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([])
    const [isActive, setIsActive] = useState(false)

    const trigger = useCallback(() => {
        const emojis = ['💕', '✨', '🥔', '💖', '🌸', '💗', '⭐']
        const newPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 40 + Math.random() * 20,
            emoji: emojis[i % emojis.length],
            rotation: Math.random() * 360,
            delay: i * 50,
        }))

        setPieces(newPieces)
        setIsActive(true)

        // Clear after animation completes
        setTimeout(() => {
            setIsActive(false)
            setPieces([])
        }, 3000)
    }, [count])

    return { pieces, isActive, trigger }
}

// ============================================
// PARALLAX SCROLL HOOK
// ============================================
export const useParallax = (speed = 0.5) => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setOffset(window.scrollY * speed)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return offset
}

// ============================================
// HOVER STATE HOOK
// ============================================
export const useHoverAnimation = () => {
    const [isHovered, setIsHovered] = useState(false)

    const hoverProps = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onFocus: () => setIsHovered(true),
        onBlur: () => setIsHovered(false),
    }

    return { isHovered, hoverProps }
}
