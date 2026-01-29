/**
 * Potato Puns Data
 * A collection of heartfelt and silly potato-themed puns
 */

export type PunCategory = 'romantic' | 'silly' | 'sweet'

export interface Pun {
    id: number
    setup: string
    punchline: string
    category: PunCategory
    emoji?: string
}

export const puns: Pun[] = [
    // Romantic Puns
    {
        id: 1,
        setup: "I yam so in love with you...",
        punchline: "exactly as you are 💕",
        category: 'romantic',
        emoji: '🍠',
    },
    {
        id: 2,
        setup: "You're one hot potato...",
        punchline: "and I'd never let you go 🔥",
        category: 'romantic',
        emoji: '🥔',
    },
    {
        id: 3,
        setup: "We're the perfect mash...",
        punchline: "we were meant to be together 💝",
        category: 'romantic',
        emoji: '🥣',
    },
    {
        id: 4,
        setup: "You make my heart...",
        punchline: "feel like it's been fried — all warm and golden ✨",
        category: 'romantic',
        emoji: '🍟',
    },
    {
        id: 5,
        setup: "I'd never tot...",
        punchline: "about being with anyone else 💗",
        category: 'romantic',
        emoji: '🥔',
    },

    // Sweet Puns
    {
        id: 6,
        setup: "You're a-peel-ing...",
        punchline: "in every single way 🌟",
        category: 'sweet',
        emoji: '✨',
    },
    {
        id: 7,
        setup: "You're spec-tater-cular...",
        punchline: "inside and out 💖",
        category: 'sweet',
        emoji: '🌈',
    },
    {
        id: 8,
        setup: "Life with you is...",
        punchline: "starch-ed with happiness 🌻",
        category: 'sweet',
        emoji: '☀️',
    },
    {
        id: 9,
        setup: "You're the tater...",
        punchline: "to my tot, the cheese to my fries 🧀",
        category: 'sweet',
        emoji: '💕',
    },
    {
        id: 10,
        setup: "I think you're...",
        punchline: "un-fry-gettable 💫",
        category: 'sweet',
        emoji: '🍟',
    },
    {
        id: 11,
        setup: "You're not just any potato...",
        punchline: "you're my sweet potato 🍠💕",
        category: 'sweet',
        emoji: '🍠',
    },
    {
        id: 12,
        setup: "Every moment with you...",
        punchline: "is spud-tacular ⭐",
        category: 'sweet',
        emoji: '🥔',
    },

    // Silly Puns
    {
        id: 13,
        setup: "Are you a potato?",
        punchline: "Because I'm totally tuber you! 😄",
        category: 'silly',
        emoji: '🥔',
    },
    {
        id: 14,
        setup: "What do I call you?",
        punchline: "My significant tater 🥔💍",
        category: 'silly',
        emoji: '💍',
    },
    {
        id: 15,
        setup: "Why do I love you?",
        punchline: "I don't know, I just do — it's no small fry! 🍟",
        category: 'silly',
        emoji: '🤷',
    },
    {
        id: 16,
        setup: "You had me at...",
        punchline: "potato 🥔❤️",
        category: 'silly',
        emoji: '😍',
    },
    {
        id: 17,
        setup: "I'm not trying to be cheesy...",
        punchline: "but we're a-maize-ing together (wait, wrong veggie) 🌽😅",
        category: 'silly',
        emoji: '😂',
    },
    {
        id: 18,
        setup: "What's our love story?",
        punchline: "A real chip off the old block 💕",
        category: 'silly',
        emoji: '🥔',
    },
    {
        id: 19,
        setup: "I'm not half-baked...",
        punchline: "about loving you — I'm fully committed! 🔥",
        category: 'silly',
        emoji: '💯',
    },
    {
        id: 20,
        setup: "Let's never split...",
        punchline: "like a potato that's been cut in half 🥺",
        category: 'romantic',
        emoji: '💔',
    },
]

/**
 * Get puns by category
 */
export const getPunsByCategory = (category: PunCategory): Pun[] => {
    return puns.filter(pun => pun.category === category)
}

/**
 * Get a random pun
 */
export const getRandomPun = (): Pun => {
    return puns[Math.floor(Math.random() * puns.length)]
}

/**
 * Get multiple random puns (no duplicates)
 */
export const getRandomPuns = (count: number): Pun[] => {
    const shuffled = [...puns].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, puns.length))
}

export default puns
