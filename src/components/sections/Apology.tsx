import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHeart } from 'react-icons/fa'

// ============================================
// TYPES
// ============================================
interface ApologyProps {
    /** Custom title for the section */
    title?: string
    /** Custom paragraphs - if not provided, uses default heartfelt text */
    paragraphs?: string[]
    /** Signature/closing text */
    signature?: string
    /** Section ID for navigation */
    id?: string
}

// ============================================
// DEFAULT CONTENT
// ============================================
const defaultParagraphs = [
    "I was thoughtless and immature when I made that comment about you being 'flat.' Even typing it now makes me cringe at how careless I was with your feelings.",

    "Even though it was two months ago, learning that those words have been hurting you all this time breaks my heart. I hate that I'm the reason you've been carrying this pain.",

    "I won't make excuses. There is no excuse. What I said was wrong, plain and simple. It doesn't matter what context it was in or what I thought I meant — it hurt you, and that's what matters.",

    "Please know this: that comment does not reflect how I see you. Not even close. You are beautiful to me. Every part of you. The way you look, the way you move, the way you exist in this world — it all takes my breath away.",

    "I am so deeply, genuinely attracted to you. Not despite anything, but because of everything you are. I should have made you feel that every single day, and I failed.",

    "I'm not asking you to forget what I said. I'm asking for the chance to prove, through my actions and my words from this moment forward, that you are cherished. That you are wanted. That you are perfect to me.",
]

// ============================================
// DECORATIVE LINE COMPONENT
// ============================================
const DecorativeLine: React.FC = () => (
    <div className="flex items-center justify-center gap-4 my-8" aria-hidden="true">
        <motion.div
            className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent w-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        />
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
            viewport={{ once: true }}
        >
            <FaHeart className="text-primary-200 text-sm" />
        </motion.div>
        <motion.div
            className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent w-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        />
    </div>
)

// ============================================
// ANIMATED PARAGRAPH COMPONENT
// ============================================
interface AnimatedParagraphProps {
    children: string
    delay: number
    isFirst?: boolean
}

const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
    children,
    delay,
    isFirst = false
}) => {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    })

    return (
        <motion.p
            ref={ref}
            className={`
        text-secondary-400 leading-relaxed
        ${isFirst ? 'text-lg md:text-xl font-medium text-secondary-500' : 'text-base md:text-lg'}
      `}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: 0.7,
                delay: delay * 0.15,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            {children}
        </motion.p>
    )
}

// ============================================
// MAIN APOLOGY COMPONENT
// ============================================
export const Apology: React.FC<ApologyProps> = ({
    title = "I Need to Say Something Important",
    paragraphs = defaultParagraphs,
    signature = "I'm sorry. Truly, deeply sorry.",
    id = "apology",
}) => {
    const { ref: titleRef, inView: titleInView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    })

    return (
        <section
            id={id}
            className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-secondary-50 to-cream"
            aria-label="A sincere apology"
        >
            {/* Subtle decorative background element */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255, 188, 205, 0.15) 0%, transparent 50%)`,
                }}
                aria-hidden="true"
            />

            <div className="relative max-w-2xl mx-auto">
                {/* Section Title */}
                <motion.div
                    ref={titleRef}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.h2
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary-500 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {title}
                    </motion.h2>

                    <DecorativeLine />
                </motion.div>

                {/* Letter Content */}
                <motion.article
                    className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft border border-white/50"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Opening "Dear" salutation */}
                    <motion.p
                        className="font-serif text-xl md:text-2xl text-secondary-500 mb-8 italic"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        My dearest,
                    </motion.p>

                    {/* Main paragraphs */}
                    <div className="space-y-6">
                        {paragraphs.map((paragraph, index) => (
                            <AnimatedParagraph
                                key={index}
                                delay={index + 1}
                                isFirst={index === 0}
                            >
                                {paragraph}
                            </AnimatedParagraph>
                        ))}
                    </div>

                    {/* Signature */}
                    <motion.div
                        className="mt-10 pt-8 border-t border-secondary-100"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-serif text-lg md:text-xl text-secondary-500 italic text-center">
                            {signature}
                        </p>

                        <motion.div
                            className="flex justify-center mt-6"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            >
                                <FaHeart className="text-2xl text-primary-300" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.article>

                {/* Bottom encouragement */}
                <motion.p
                    className="text-center text-secondary-300 text-sm md:text-base mt-8 italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    This is just the beginning of me making things right... 💕
                </motion.p>
            </div>
        </section>
    )
}

Apology.displayName = 'Apology'

export default Apology
