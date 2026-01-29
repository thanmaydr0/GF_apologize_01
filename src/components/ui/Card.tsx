import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

// ============================================
// CARD COMPONENTS
// ============================================

interface CardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode
    className?: string
    hoverable?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className = '', hoverable = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={`
          bg-white/80 backdrop-blur-sm rounded-2xl
          border border-white/50 shadow-romantic
          ${hoverable ? 'hover:shadow-romantic-lg hover:-translate-y-1 transition-all duration-300' : ''}
          ${className}
        `}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)
Card.displayName = 'Card'

// ============================================
// CARD HEADER
// ============================================
interface CardHeaderProps {
    children: React.ReactNode
    className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
    <div className={`px-6 pt-6 pb-2 ${className}`}>
        {children}
    </div>
)
CardHeader.displayName = 'CardHeader'

// ============================================
// CARD TITLE
// ============================================
interface CardTitleProps {
    children: React.ReactNode
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle: React.FC<CardTitleProps> = ({
    children,
    className = '',
    as: Component = 'h3'
}) => (
    <Component className={`font-serif text-xl text-secondary-500 ${className}`}>
        {children}
    </Component>
)
CardTitle.displayName = 'CardTitle'

// ============================================
// CARD CONTENT
// ============================================
interface CardContentProps {
    children: React.ReactNode
    className?: string
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 ${className}`}>
        {children}
    </div>
)
CardContent.displayName = 'CardContent'

// ============================================
// CARD FOOTER
// ============================================
interface CardFooterProps {
    children: React.ReactNode
    className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
    <div className={`px-6 pb-6 pt-2 ${className}`}>
        {children}
    </div>
)
CardFooter.displayName = 'CardFooter'

export default Card
