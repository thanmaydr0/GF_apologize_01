import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

// ============================================
// TYPES
// ============================================
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

// ============================================
// STYLES
// ============================================
const baseStyles = `
  inline-flex items-center justify-center
  font-medium font-sans
  rounded-full
  transition-colors duration-300
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  cursor-pointer select-none
`

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-primary-200 text-secondary-500
    hover:bg-primary-300
    focus-visible:ring-primary-300
    shadow-romantic hover:shadow-romantic-lg
  `,
    secondary: `
    bg-secondary-100 text-secondary-500
    hover:bg-secondary-200
    focus-visible:ring-secondary-300
    shadow-soft
  `,
    ghost: `
    bg-transparent text-secondary-500
    hover:bg-primary-50
    focus-visible:ring-primary-200
  `,
    outline: `
    bg-transparent text-primary-400
    border-2 border-primary-200
    hover:bg-primary-50 hover:border-primary-300
    focus-visible:ring-primary-300
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-sm px-4 py-2 gap-1.5',
    md: 'text-base px-6 py-3 gap-2',
    lg: 'text-lg px-8 py-4 gap-2.5',
}

// ============================================
// COMPONENT
// ============================================
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.replace(/\s+/g, ' ').trim()

        return (
            <motion.button
                ref={ref}
                className={combinedClassName}
                disabled={disabled || isLoading}
                whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                }}
                aria-disabled={disabled || isLoading}
                {...props}
            >
                {/* Loading Spinner */}
                {isLoading && (
                    <motion.span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        aria-hidden="true"
                    />
                )}

                {/* Left Icon */}
                {!isLoading && leftIcon && (
                    <span className="flex-shrink-0" aria-hidden="true">
                        {leftIcon}
                    </span>
                )}

                {/* Button Text */}
                <span>{children}</span>

                {/* Right Icon */}
                {rightIcon && (
                    <span className="flex-shrink-0" aria-hidden="true">
                        {rightIcon}
                    </span>
                )}
            </motion.button>
        )
    }
)

Button.displayName = 'Button'

export default Button
