import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHeart, FaSearch, FaRandom, FaTimes } from 'react-icons/fa'
import {
    reasons,
    categoryLabels,
    getRandomReason,
    type Reason,
    type ReasonCategory
} from '../../data/reasons'
import { Button } from '../ui'

// ============================================
// TYPES
// ============================================
interface ReasonsILoveYouProps {
    id?: string
    initialLoadCount?: number
    loadMoreCount?: number
}

// ============================================
// ANIMATED COUNTER
// ============================================
const AnimatedCounter: React.FC<{ value: number; total: number }> = ({ value, total }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const duration = 1500
        const steps = 30
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setDisplayValue(value)
                clearInterval(timer)
            } else {
                setDisplayValue(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [value])

    return (
        <div className="text-center mb-8">
            <motion.div
                className="inline-flex items-baseline gap-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="font-serif text-5xl md:text-6xl text-primary-400 font-bold">
                    {displayValue}
                </span>
                <span className="text-2xl text-secondary-300">/ {total}</span>
            </motion.div>
            <p className="text-secondary-400 mt-2">reasons discovered</p>
        </div>
    )
}

// ============================================
// CATEGORY FILTER PILLS
// ============================================
interface CategoryFiltersProps {
    activeCategory: ReasonCategory | 'all'
    onCategoryChange: (category: ReasonCategory | 'all') => void
    counts: Record<ReasonCategory, number>
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
    activeCategory,
    onCategoryChange,
    counts
}) => {
    const categories: { key: ReasonCategory | 'all'; label: string; emoji: string }[] = [
        { key: 'all', label: 'All', emoji: '💕' },
        ...Object.entries(categoryLabels).map(([key, val]) => ({
            key: key as ReasonCategory,
            label: `${val.label} (${counts[key as ReasonCategory] || 0})`,
            emoji: val.emoji,
        })),
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
                            : 'bg-white/70 text-secondary-400 hover:bg-white/90 border border-secondary-100'}
          `}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="mr-1.5">{cat.emoji}</span>
                    {cat.label}
                </motion.button>
            ))}
        </div>
    )
}

// ============================================
// SEARCH BAR
// ============================================
interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    onClear: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear }) => (
    <div className="relative max-w-md mx-auto mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-300" />
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search reasons..."
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white/80 border border-secondary-100 
                 text-secondary-500 placeholder:text-secondary-300
                 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent
                 transition-all"
            aria-label="Search reasons"
        />
        {value && (
            <button
                onClick={onClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-300 hover:text-secondary-500"
                aria-label="Clear search"
            >
                <FaTimes />
            </button>
        )}
    </div>
)

// ============================================
// SINGLE REASON CARD
// ============================================
interface ReasonCardProps {
    reason: Reason
    index: number
    isFavorited: boolean
    onToggleFavorite: (id: number) => void
}

const ReasonCard: React.FC<ReasonCardProps> = ({
    reason,
    index,
    isFavorited,
    onToggleFavorite
}) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })

    const categoryInfo = categoryLabels[reason.category]
    const isEven = index % 2 === 0

    return (
        <motion.article
            ref={ref}
            className={`
        relative p-5 md:p-6 rounded-2xl
        ${isEven ? 'bg-white/60' : 'bg-primary-50/40'}
        border border-white/60
        transition-all duration-300
        hover:shadow-romantic hover:scale-[1.01]
        group
      `}
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
        >
            {/* Reason Number */}
            <div className="absolute -left-2 -top-2 w-10 h-10 rounded-full bg-primary-100 
                      flex items-center justify-center shadow-sm
                      text-sm font-bold text-primary-400">
                {reason.id}
            </div>

            {/* Content */}
            <div className="pl-6 pr-10">
                <p className="text-secondary-500 text-base md:text-lg leading-relaxed">
                    {reason.text}
                </p>

                {/* Category Tag */}
                <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-secondary-50 text-secondary-400">
                    {categoryInfo.emoji} {categoryInfo.label}
                </span>
            </div>

            {/* Favorite Button */}
            <motion.button
                onClick={() => onToggleFavorite(reason.id)}
                className={`
          absolute right-4 top-1/2 -translate-y-1/2
          p-2 rounded-full transition-all
          ${isFavorited
                        ? 'text-primary-400 bg-primary-50'
                        : 'text-secondary-200 hover:text-primary-300 opacity-0 group-hover:opacity-100'}
        `}
                whileTap={{ scale: 0.85 }}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
                <FaHeart className={isFavorited ? 'animate-heartbeat' : ''} />
            </motion.button>
        </motion.article>
    )
}

// ============================================
// RANDOM REASON SPOTLIGHT
// ============================================
const RandomReasonSpotlight: React.FC = () => {
    const [currentReason, setCurrentReason] = useState<Reason>(getRandomReason())
    const [isAnimating, setIsAnimating] = useState(false)

    const handleNewReason = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentReason(getRandomReason())
            setIsAnimating(false)
        }, 300)
    }

    return (
        <motion.div
            className="bg-gradient-to-br from-primary-100 via-white to-accent-50 
                 rounded-3xl p-8 md:p-10 mb-12 text-center shadow-romantic-lg
                 border border-primary-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="text-3xl mb-4">🎲</div>
            <h3 className="font-serif text-xl text-secondary-500 mb-6">
                Surprise Reason
            </h3>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentReason.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -10 : 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6"
                >
                    <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/60 text-sm text-secondary-400">
                        #{currentReason.id}
                    </span>
                    <p className="font-serif text-xl md:text-2xl text-secondary-500 leading-relaxed max-w-lg mx-auto">
                        "{currentReason.text}"
                    </p>
                </motion.div>
            </AnimatePresence>

            <Button
                onClick={handleNewReason}
                variant="primary"
                leftIcon={<FaRandom />}
            >
                Surprise Me!
            </Button>
        </motion.div>
    )
}

// ============================================
// MAIN COMPONENT
// ============================================
export const ReasonsILoveYou: React.FC<ReasonsILoveYouProps> = ({
    id = 'reasons-list',
    initialLoadCount = 20,
    loadMoreCount = 15,
}) => {
    const [activeCategory, setActiveCategory] = useState<ReasonCategory | 'all'>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [loadedCount, setLoadedCount] = useState(initialLoadCount)
    const [favorites, setFavorites] = useState<Set<number>>(new Set())

    const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
        threshold: 0,
        rootMargin: '200px',
    })

    // Filter reasons based on category and search
    const filteredReasons = useMemo(() => {
        let result = reasons

        if (activeCategory !== 'all') {
            result = result.filter(r => r.category === activeCategory)
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(r => r.text.toLowerCase().includes(query))
        }

        return result
    }, [activeCategory, searchQuery])

    // Displayed reasons (with lazy loading)
    const displayedReasons = useMemo(() => {
        return filteredReasons.slice(0, loadedCount)
    }, [filteredReasons, loadedCount])

    // Category counts
    const categoryCounts = useMemo(() => {
        return reasons.reduce((acc, r) => {
            acc[r.category] = (acc[r.category] || 0) + 1
            return acc
        }, {} as Record<ReasonCategory, number>)
    }, [])

    // Load more on scroll
    useEffect(() => {
        if (loadMoreInView && loadedCount < filteredReasons.length) {
            setLoadedCount(prev => Math.min(prev + loadMoreCount, filteredReasons.length))
        }
    }, [loadMoreInView, loadedCount, filteredReasons.length, loadMoreCount])

    // Reset loaded count when filters change
    useEffect(() => {
        setLoadedCount(initialLoadCount)
    }, [activeCategory, searchQuery, initialLoadCount])

    const toggleFavorite = useCallback((id: number) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            if (newFavorites.has(id)) {
                newFavorites.delete(id)
            } else {
                newFavorites.add(id)
            }
            return newFavorites
        })
    }, [])

    const hasMore = loadedCount < filteredReasons.length

    return (
        <section
            id={id}
            className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-cream via-blush/30 to-cream"
            aria-label="100+ reasons I love you"
        >
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <motion.header
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="text-5xl block mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        💕
                    </motion.span>

                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary-500 mb-4">
                        100+ Reasons <span className="text-gradient-romantic">I Love You</span>
                    </h2>

                    <p className="text-lg text-secondary-300 max-w-xl mx-auto">
                        Because you deserve to know every single one
                    </p>
                </motion.header>

                {/* Progress Counter */}
                <AnimatedCounter value={displayedReasons.length} total={reasons.length} />

                {/* Random Reason Spotlight */}
                <RandomReasonSpotlight />

                {/* Search Bar */}
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={() => setSearchQuery('')}
                />

                {/* Category Filters */}
                <CategoryFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    counts={categoryCounts}
                />

                {/* Results count */}
                {(searchQuery || activeCategory !== 'all') && (
                    <p className="text-center text-secondary-400 mb-6">
                        Showing {filteredReasons.length} reason{filteredReasons.length !== 1 ? 's' : ''}
                    </p>
                )}

                {/* Reasons List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {displayedReasons.map((reason, index) => (
                            <ReasonCard
                                key={reason.id}
                                reason={reason}
                                index={index}
                                isFavorited={favorites.has(reason.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Load More Trigger */}
                {hasMore && (
                    <div ref={loadMoreRef} className="py-8 text-center">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-secondary-300"
                        >
                            Loading more reasons...
                        </motion.div>
                    </div>
                )}

                {/* End Message */}
                {!hasMore && filteredReasons.length > 0 && (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="text-4xl mb-4 block">🥔💕</span>
                        <p className="font-serif text-xl text-secondary-400 italic">
                            And there are still so many more I haven't written yet...
                        </p>
                    </motion.div>
                )}

                {/* No Results */}
                {filteredReasons.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-4xl mb-4 block">🔍</span>
                        <p className="text-secondary-400">
                            No reasons found matching your search.
                            <br />
                            Try a different term!
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

ReasonsILoveYou.displayName = 'ReasonsILoveYou'

export default ReasonsILoveYou
