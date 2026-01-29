import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// ============================================
// TYPES
// ============================================
type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'
type SectionWidth = 'narrow' | 'default' | 'wide' | 'full'
type SectionBackground = 'transparent' | 'cream' | 'blush' | 'gradient' | 'warm'

interface SectionContainerProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
    children: React.ReactNode
    spacing?: SectionSpacing
    width?: SectionWidth
    background?: SectionBackground
    centered?: boolean
    animate?: boolean
    id?: string
    ariaLabel?: string
}

// ============================================
// STYLES
// ============================================
const spacingStyles: Record<SectionSpacing, string> = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40',
}

const widthStyles: Record<SectionWidth, string> = {
    narrow: 'max-w-2xl',
    default: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-none',
}

const backgroundStyles: Record<SectionBackground, string> = {
    transparent: '',
    cream: 'bg-cream',
    blush: 'bg-blush',
    gradient: 'bg-gradient-romantic',
    warm: 'bg-gradient-warm',
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
            staggerChildren: 0.1,
        },
    },
}

// ============================================
// COMPONENT
// ============================================
export const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
    (
        {
            children,
            spacing = 'md',
            width = 'default',
            background = 'transparent',
            centered = true,
            animate = true,
            id,
            ariaLabel,
            className = '',
            ...props
        },
        ref
    ) => {
        const { ref: inViewRef, inView } = useInView({
            threshold: 0.1,
            triggerOnce: true,
        })

        // Combine refs
        const combinedRef = (node: HTMLElement | null) => {
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref) {
                ref.current = node
            }
            inViewRef(node)
        }

        const containerClassName = `
      ${spacingStyles[spacing]}
      ${backgroundStyles[background]}
      px-6 md:px-8
      ${className}
    `.replace(/\s+/g, ' ').trim()

        const innerClassName = `
      ${widthStyles[width]}
      ${centered ? 'mx-auto' : ''}
    `.replace(/\s+/g, ' ').trim()

        return (
            <motion.section
                ref={combinedRef}
                id={id}
                aria-label={ariaLabel}
                className={containerClassName}
                variants={animate ? sectionVariants : undefined}
                initial={animate ? 'hidden' : undefined}
                animate={animate && inView ? 'visible' : undefined}
                {...props}
            >
                <div className={innerClassName}>
                    {children}
                </div>
            </motion.section>
        )
    }
)

SectionContainer.displayName = 'SectionContainer'

// ============================================
// HELPER: Section Header
// ============================================
interface SectionHeaderProps {
    title: string
    subtitle?: string
    centered?: boolean
    className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    centered = true,
    className = '',
}) => (
    <motion.header
        className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''} ${className}`}
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        }}
    >
        <h2 className="text-secondary-500 mb-4">{title}</h2>
        {subtitle && (
            <p className="text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto">
                {subtitle}
            </p>
        )}
    </motion.header>
)

SectionHeader.displayName = 'SectionHeader'

export default SectionContainer
