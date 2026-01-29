/**
 * Scratch Card Hidden Messages
 * Compliments and surprises hidden behind scratch surfaces
 */

export interface ScratchCardData {
    id: number
    title: string
    hiddenMessage: string
    emoji: string
    category: 'compliment' | 'memory' | 'promise' | 'playful'
}

export const scratchCards: ScratchCardData[] = [
    {
        id: 1,
        title: "What I think of your voice",
        hiddenMessage: "It's my favorite sound in the entire world. I could listen to you talk forever and never get bored. Your laugh? That's my ringtone for happiness.",
        emoji: "🎵",
        category: 'compliment',
    },
    {
        id: 2,
        title: "My favorite thing about you",
        hiddenMessage: "The way you make me feel like I'm the only person that matters when we're on call. Your full attention is a gift I never take for granted.",
        emoji: "💕",
        category: 'compliment',
    },
    {
        id: 3,
        title: "What I'm planning for when we meet",
        hiddenMessage: "First, the longest hug imaginable. Then, I want to just look at you — really look at you. After that? Whatever adventure we want, together.",
        emoji: "✈️",
        category: 'promise',
    },
    {
        id: 4,
        title: "Why you're beautiful",
        hiddenMessage: "Not just how you look (though I replay those vacation memories constantly). It's your soul — the kindness, the strength, the way you love. All of it is beautiful.",
        emoji: "✨",
        category: 'compliment',
    },
    {
        id: 5,
        title: "Secret nickname I have for you",
        hiddenMessage: "My Potato 🥔 Because you're comfort, warmth, and the best thing ever. Also: 'My person', 'My favorite', and 'The one I want to talk to first'.",
        emoji: "🥔",
        category: 'playful',
    },
    {
        id: 6,
        title: "What I was thinking when we became more than friends",
        hiddenMessage: "I thought: 'This is it. This is the person I've been waiting for without knowing I was waiting.' And I was terrified of how much I already felt.",
        emoji: "💫",
        category: 'memory',
    },
    {
        id: 7,
        title: "Promise I'm making to you",
        hiddenMessage: "I promise to choose you, every day. To communicate, even when it's hard. To make every kilometer between us feel like nothing. To be worth the wait.",
        emoji: "🤝",
        category: 'promise',
    },
    {
        id: 8,
        title: "What I miss most about being with you",
        hiddenMessage: "Your presence. Not just being near you — but the peace I felt. How everything made sense. How home wasn't a place anymore, it was you.",
        emoji: "🏠",
        category: 'memory',
    },
    {
        id: 9,
        title: "Something I've never told you",
        hiddenMessage: "Sometimes I re-read our old chats and smile at my phone like an absolute fool. You make me happier than you know, even through a screen.",
        emoji: "🤫",
        category: 'playful',
    },
    {
        id: 10,
        title: "What you mean to me",
        hiddenMessage: "You're my girlfriend, my favorite person, my calm, my chaos, my laughter, my future. Every reel I send? It's my way of saying 'I thought of you, again.'",
        emoji: "❤️",
        category: 'compliment',
    },
    {
        id: 11,
        title: "Why I chose you",
        hiddenMessage: "Because being your friend showed me exactly who you are. And who you are is everything I never knew I needed. Distance couldn't change that.",
        emoji: "🌟",
        category: 'memory',
    },
    {
        id: 12,
        title: "What I dream about",
        hiddenMessage: "Waking up and actually seeing you. Hearing 'good morning' in person, not through a phone. Building a life where distance is just a memory we laugh about.",
        emoji: "💭",
        category: 'promise',
    },
]

export default scratchCards
