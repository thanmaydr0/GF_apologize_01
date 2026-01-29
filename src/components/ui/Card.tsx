import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

// ============================================
// TYPES
// ============================================
type CardVariant = 'default' | 'elevated' | 'glass' | 'outlined'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: React.ReactNode
    variant?: CardVariant
    padding?: CardPadding
    hoverable?: boolean
    as?: 'div' | 'article' | 'section'
}

// ============================================
// STYLES
// ============================================
const baseStyles = `
  rounded-3xl
  transition-all duration-300
`

const variantStyles: Record<CardVariant, string> = {
    default: `
    bg-white/80
    border border-secondary-100
    shadow-soft
  `,
    elevated: `
    bg-white
    shadow-romantic
    hover:shadow-romantic-lg
  `,
    glass: `
    glass-effect
    border border-white/40
    shadow-soft
  `,
    outlined: `
    bg-transparent
    border-2 border-primary-100
    hover:border-primary-200
  `,
}

const paddingStyles: Record<CardPadding, string> = {
    none: '',
    sm: 'p-4 md:p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10 lg:p-12',
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const hoverVariants = {
    rest: {
        y: 0,
        scale: 1,
    },
    hover: {
        y: -4,
        scale: 1.01,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    },
}

// ============================================
// COMPONENT
// ============================================
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            variant = 'default',
            padding = 'md',
            hoverable = false,
            as = 'div',
            className = '',
            ...props
        },
        ref
    ) => {
        const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${paddingStyles[padding]}
      ${hoverable ? 'cursor-pointer' : ''}
      ${className}
    `.replace(/\s+/g, ' ').trim()

        const MotionComponent = motion[as] as typeof motion.div

        return (
            <MotionComponent
                ref={ref}
                className={combinedClassName}
                variants={hoverable ? hoverVariants : undefined}
                initial={hoverable ? 'rest' : undefined}
                whileHover={hoverable ? 'hover' : undefined}
                {...props}
            >
                {children}
            </MotionComponent>
        )
    }
)

Card.displayName = 'Card'

// ============================================
// CARD SUBCOMPONENTS
// ============================================

interface CardHeaderProps {
    children: React.ReactNode
    className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    className = '',
}) => (
    <div className={`mb-4 md:mb-6 ${className}`}>
        {children}
    </div>
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps {
    children: React.ReactNode
    as?: 'h2' | 'h3' | 'h4'
    className?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({
    children,
    as: Tag = 'h3',
    className = '',
}) => (
    <Tag className={`font-serif text-secondary-500 ${className}`}>
        {children}
    </Tag>
)

CardTitle.displayName = 'CardTitle'

interface CardContentProps {
    children: React.ReactNode
    className?: string
}

export const CardContent: React.FC<CardContentProps> = ({
    children,
    className = '',
}) => (
    <div className={`text-secondary-400 ${className}`}>
        {children}
    </div>
)

CardContent.displayName = 'CardContent'

interface CardFooterProps {
    children: React.ReactNode
    className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({
    children,
    className = '',
}) => (
    <div className={`mt-6 pt-4 border-t border-secondary-100 ${className}`}>
        {children}
    </div>
)

CardFooter.displayName = 'CardFooter'

export default Card
