/**
 * Utility functions for the romantic reconciliation website
 */

/**
 * Clamps a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
}

/**
 * Generates a random number between min and max
 */
export const random = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

/**
 * Formats a date string into a readable format
 */
export const formatDate = (date: string | Date): string => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Generates heart positions for decorative elements
 */
export const generateHeartPositions = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: random(0, 100),
        y: random(0, 100),
        size: random(10, 30),
        delay: random(0, 5),
        duration: random(3, 6),
    }))
}

/**
 * Easing functions for custom animations
 */
export const easings = {
    easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t: number): number =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutElastic: (t: number): number => {
        const c4 = (2 * Math.PI) / 3
        return t === 0
            ? 0
            : t === 1
                ? 1
                : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
    },
}
