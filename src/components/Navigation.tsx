import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaHeart, FaArrowUp } from 'react-icons/fa'

// ============================================
// TYPES
// ============================================
interface NavItem {
    id: string
    label: string
    emoji?: string
}

interface NavigationProps {
    items?: NavItem[]
}

// ============================================
// DEFAULT NAV ITEMS
// ============================================
const defaultNavItems: NavItem[] = [
    { id: 'apology', label: 'My Apology', emoji: '💌' },
    { id: 'puns', label: 'Potato Puns', emoji: '🥔' },
    { id: 'reasons-list', label: '100+ Reasons', emoji: '💕' },
    { id: 'scratch-cards', label: 'Surprises', emoji: '🎁' },
    { id: 'countdown', label: 'Countdown', emoji: '⏰' },
    { id: 'closure', label: 'Final Words', emoji: '✨' },
]

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const ScrollToTopButton: React.FC<{ show: boolean }> = ({ show }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 p-4 rounded-full
                     bg-white/80 backdrop-blur-sm shadow-romantic
                     text-primary-400 hover:text-primary-500
                     hover:shadow-romantic-lg transition-all
                     focus:outline-none focus:ring-2 focus:ring-primary-300"
                    aria-label="Scroll to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaArrowUp className="text-lg" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

// ============================================
// MOBILE MENU
// ============================================
interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    items: NavItem[]
    activeSection: string
    onNavClick: (id: string) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    onClose,
    items,
    activeSection,
    onNavClick,
}) => {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-secondary-500/20 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Menu panel */}
                    <motion.nav
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-50 h-full w-72 
                       bg-white/95 backdrop-blur-md shadow-2xl
                       flex flex-col"
                        role="navigation"
                        aria-label="Mobile navigation"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-primary-100">
                            <span className="font-serif text-lg text-secondary-500">
                                Navigate 🥔
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 text-secondary-400 hover:text-secondary-500 transition-colors"
                                aria-label="Close menu"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Nav items */}
                        <div className="flex-1 overflow-y-auto py-4">
                            {items.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onNavClick(item.id)}
                                    className={`
                    w-full px-6 py-4 text-left flex items-center gap-3
                    transition-colors
                    ${activeSection === item.id
                                            ? 'bg-primary-50 text-primary-500 border-r-4 border-primary-400'
                                            : 'text-secondary-400 hover:bg-secondary-50 hover:text-secondary-500'
                                        }
                  `}
                                >
                                    <span className="text-lg">{item.emoji}</span>
                                    <span className="font-medium">{item.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-primary-100 text-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FaHeart className="inline text-primary-300" />
                            </motion.div>
                            <p className="text-xs text-secondary-300 mt-2">Made with love</p>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    )
}

// ============================================
// MAIN NAVIGATION COMPONENT
// ============================================
export const Navigation: React.FC<NavigationProps> = ({
    items = defaultNavItems,
}) => {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [showScrollTop, setShowScrollTop] = useState(false)

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

            setScrollProgress(progress)
            setIsVisible(scrollTop > 100)
            setShowScrollTop(scrollTop > 500)

            // Find active section
            const sections = items.map(item => document.getElementById(item.id)).filter(Boolean)
            const headerOffset = 100

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop - headerOffset <= scrollTop) {
                    setActiveSection(items[i].id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial check

        return () => window.removeEventListener('scroll', handleScroll)
    }, [items])

    // Smooth scroll to section
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            setIsMobileMenuOpen(false)
        }
    }, [])

    return (
        <>
            {/* Main header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-100/50">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-300"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>

                {/* Nav bar */}
                <nav
                    className="bg-white/80 backdrop-blur-md border-b border-white/50 shadow-sm"
                    role="navigation"
                    aria-label="Main navigation"
                >
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <motion.button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="flex items-center gap-2 text-secondary-500 hover:text-secondary-400 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-xl">🥔</span>
                                <span className="font-serif text-lg hidden sm:block">For My Potato</span>
                            </motion.button>

                            {/* Desktop nav */}
                            <div className="hidden md:flex items-center gap-1">
                                {items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`
                      px-3 py-2 rounded-lg text-sm font-medium
                      transition-colors
                      ${activeSection === item.id
                                                ? 'bg-primary-50 text-primary-500'
                                                : 'text-secondary-400 hover:bg-secondary-50 hover:text-secondary-500'
                                            }
                    `}
                                    >
                                        <span className="mr-1">{item.emoji}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden p-2 text-secondary-400 hover:text-secondary-500 transition-colors"
                                aria-label="Open menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <FaBars className="text-xl" />
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                items={items}
                activeSection={activeSection}
                onNavClick={scrollToSection}
            />

            {/* Scroll to top button */}
            <ScrollToTopButton show={showScrollTop} />
        </>
    )
}

Navigation.displayName = 'Navigation'

export default Navigation
