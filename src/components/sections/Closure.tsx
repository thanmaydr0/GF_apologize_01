import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHeart, FaPhone, FaInstagram, FaWhatsapp } from 'react-icons/fa'

// ============================================
// TYPES
// ============================================
interface ClosureProps {
    id?: string
    /** Custom final message */
    message?: string
    /** Your name/signature */
    signature?: string
    /** WhatsApp number (with country code, no spaces) */
    whatsappNumber?: string
    /** Instagram username (without @) */
    instagramUsername?: string
    /** Phone number for calls */
    phoneNumber?: string
}

// ============================================
// KAWAII POTATO CHARACTER
// ============================================
const KawaiiPotato: React.FC = () => (
    <motion.svg
        viewBox="0 0 120 100"
        className="w-32 h-28 md:w-40 md:h-36"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
    >
        {/* Potato body */}
        <motion.ellipse
            cx="60"
            cy="55"
            rx="45"
            ry="38"
            fill="url(#closurePotatoGradient)"
            stroke="#C4A574"
            strokeWidth="2"
            animate={{
                scaleY: [1, 0.98, 1],
                scaleX: [1, 1.01, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Left eye */}
        <circle cx="45" cy="50" r="5" fill="#3D3028" />
        <circle cx="46" cy="48" r="2" fill="white" />

        {/* Right eye */}
        <circle cx="75" cy="50" r="5" fill="#3D3028" />
        <circle cx="76" cy="48" r="2" fill="white" />

        {/* Blush */}
        <ellipse cx="35" cy="60" rx="8" ry="5" fill="#FFBCCD" opacity="0.6" />
        <ellipse cx="85" cy="60" rx="8" ry="5" fill="#FFBCCD" opacity="0.6" />

        {/* Happy smile */}
        <path
            d="M48 68 Q60 78 72 68"
            stroke="#3D3028"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />

        {/* Little arms reaching out */}
        <motion.path
            d="M18 55 Q10 50 5 55"
            stroke="#C4A574"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: '18px 55px' }}
        />
        <motion.path
            d="M102 55 Q110 50 115 55"
            stroke="#C4A574"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: '102px 55px' }}
        />

        {/* Floating heart */}
        <motion.text
            x="60"
            y="20"
            textAnchor="middle"
            fontSize="16"
            animate={{
                y: [20, 12, 20],
                opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            💕
        </motion.text>

        <defs>
            <linearGradient id="closurePotatoGradient" x1="20" y1="20" x2="100" y2="90">
                <stop offset="0%" stopColor="#E8D4B8" />
                <stop offset="100%" stopColor="#C4A574" />
            </linearGradient>
        </defs>
    </motion.svg>
)

// ============================================
// FLOATING ELEMENTS BACKGROUND
// ============================================
const FloatingElements: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Hearts */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={`heart-${i}`}
                className="absolute text-primary-100"
                style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    fontSize: `${14 + Math.random() * 10}px`,
                }}
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                }}
            >
                <FaHeart />
            </motion.div>
        ))}

        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
            <motion.span
                key={`sparkle-${i}`}
                className="absolute text-accent-200"
                style={{
                    left: `${15 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                }}
            >
                ✨
            </motion.span>
        ))}
    </div>
)

// ============================================
// CONTACT BUTTON
// ============================================
interface ContactButtonProps {
    icon: React.ReactNode
    label: string
    href: string
    color: string
    hoverColor: string
    delay: number
}

const ContactButton: React.FC<ContactButtonProps> = ({
    icon,
    label,
    href,
    color,
    hoverColor,
    delay,
}) => {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(true)
        setTimeout(() => setClicked(false), 1000)
    }

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={`
        relative flex items-center gap-3 px-6 py-4 rounded-2xl
        ${color} text-white font-medium
        shadow-romantic transition-all
        hover:shadow-romantic-lg ${hoverColor}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300
      `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>

            {/* Thank you animation */}
            <AnimatePresence>
                {clicked && (
                    <motion.span
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        💕 Thank you
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.a>
    )
}

// ============================================
// DEFAULT MESSAGE
// ============================================
const defaultMessage = `I know a website can't undo hurt feelings, but I hope it shows you how much you mean to me.

You deserve someone who sees you clearly, celebrates you fully, and never makes you question your worth. I want to be that person for you.

I'm here whenever you're ready to talk. No pressure. Take all the time you need.

I love you, Potato. 🥔💕`

// ============================================
// MAIN CLOSURE COMPONENT
// ============================================
export const Closure: React.FC<ClosureProps> = ({
    id = 'closure',
    message = defaultMessage,
    signature = 'With all my love',
    whatsappNumber = '',
    instagramUsername = '',
    phoneNumber = '',
}) => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

    // Build contact links
    const whatsappLink = whatsappNumber
        ? `https://wa.me/${whatsappNumber}?text=Hey%20potato%20🥔💕`
        : ''
    const instagramLink = instagramUsername
        ? `https://instagram.com/${instagramUsername}`
        : ''
    const phoneLink = phoneNumber
        ? `tel:${phoneNumber}`
        : ''

    const hasAnyContact = whatsappLink || instagramLink || phoneLink

    return (
        <section
            id={id}
            ref={ref}
            className="relative py-24 md:py-36 px-6 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF5F7 30%, #FFE9EF 70%, #FDF8F5 100%)',
            }}
            aria-label="Closing message"
        >
            {/* Background elements */}
            <FloatingElements />

            {/* Soft glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-100/20 blur-3xl pointer-events-none" />

            <div className="relative max-w-2xl mx-auto text-center">
                {/* Potato character */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                >
                    <KawaiiPotato />
                </motion.div>

                {/* Main message */}
                <motion.div
                    className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-romantic border border-white/60 mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.7 }}
                >
                    {message.split('\n\n').map((paragraph, index) => (
                        <motion.p
                            key={index}
                            className="text-secondary-500 text-lg md:text-xl leading-relaxed mb-6 last:mb-0"
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}

                    {/* Signature */}
                    <motion.div
                        className="mt-10 pt-6 border-t border-primary-100"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="font-serif italic text-xl text-secondary-400">
                            {signature}
                        </p>
                        <motion.div
                            className="mt-4 flex justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <FaHeart className="text-2xl text-primary-300" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Contact options */}
                {hasAnyContact && (
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                    >
                        <p className="text-secondary-300 mb-6">
                            Whenever you're ready...
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            {whatsappLink && (
                                <ContactButton
                                    icon={<FaWhatsapp />}
                                    label="WhatsApp Me"
                                    href={whatsappLink}
                                    color="bg-[#25D366]"
                                    hoverColor="hover:bg-[#20BD5A]"
                                    delay={0.7}
                                />
                            )}

                            {instagramLink && (
                                <ContactButton
                                    icon={<FaInstagram />}
                                    label="DM on Instagram"
                                    href={instagramLink}
                                    color="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
                                    hoverColor="hover:opacity-90"
                                    delay={0.8}
                                />
                            )}

                            {phoneLink && (
                                <ContactButton
                                    icon={<FaPhone />}
                                    label="Call Me"
                                    href={phoneLink}
                                    color="bg-secondary-400"
                                    hoverColor="hover:bg-secondary-500"
                                    delay={0.9}
                                />
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Simple fallback if no contact configured */}
                {!hasAnyContact && (
                    <motion.p
                        className="text-secondary-300 italic"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 }}
                    >
                        You know where to find me 💕
                    </motion.p>
                )}

                {/* Bottom decoration */}
                <motion.div
                    className="mt-16 flex justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                >
                    {['🥔', '💕', '🥔'].map((emoji, i) => (
                        <motion.span
                            key={i}
                            className="text-2xl"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        >
                            {emoji}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

Closure.displayName = 'Closure'

export default Closure
