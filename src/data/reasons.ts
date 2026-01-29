/**
 * 100+ Reasons I Love You
 * Context: Long-distance relationship - were friends before, 
 * started dating during vacation, now communicate through 
 * Instagram DMs, WhatsApp texts, voice calls, and sharing romantic reels.
 * No video calls, no photos shared, no stories posted.
 * Haven't met in person since getting together.
 */

export type ReasonCategory = 'physical' | 'emotional' | 'quirky' | 'character' | 'relationship'

export interface Reason {
    id: number
    text: string
    category: ReasonCategory
}

export const categoryLabels: Record<ReasonCategory, { label: string; emoji: string; color: string }> = {
    physical: { label: 'Your Voice & Presence', emoji: '✨', color: 'primary' },
    emotional: { label: 'Emotional', emoji: '💕', color: 'pink' },
    quirky: { label: 'Quirky', emoji: '🌟', color: 'accent' },
    character: { label: 'Character', emoji: '💎', color: 'secondary' },
    relationship: { label: 'Us', emoji: '🥔', color: 'warm' },
}

export const reasons: Reason[] = [
    // ============================================
    // YOUR VOICE & PRESENCE - Voice calls, memories (1-20)
    // ============================================
    { id: 1, text: "The way your voice sounds when you first pick up my call — a little sleepy, always happy", category: 'physical' },
    { id: 2, text: "How I can hear your smile through the phone even when I can't see it", category: 'physical' },
    { id: 3, text: "Your laugh during our late-night calls — it's my favorite sound in the world", category: 'physical' },
    { id: 4, text: "Remembering how you looked when we were together during that vacation", category: 'physical' },
    { id: 5, text: "The way you giggle when something catches you off guard on call", category: 'physical' },
    { id: 6, text: "Your voice getting softer when you're tired but still don't want to hang up", category: 'physical' },
    { id: 7, text: "The memories of your hugs from when we were together that I replay constantly", category: 'physical' },
    { id: 8, text: "Your morning voice on calls — raspy and adorable", category: 'physical' },
    { id: 9, text: "The way you describe things so vividly I can picture exactly what you're seeing", category: 'physical' },
    { id: 10, text: "How you sigh contentedly during comfortable silences on our calls", category: 'physical' },
    { id: 11, text: "Your excited voice when you're telling me about your day", category: 'physical' },
    { id: 12, text: "Missing how it felt to be next to you during those vacation days", category: 'physical' },
    { id: 13, text: "Your voice cracking when you laugh too hard during our calls", category: 'physical' },
    { id: 14, text: "The sound of you moving around during calls — it makes me feel close to your life", category: 'physical' },
    { id: 15, text: "How your voice changes when you're being serious vs playful", category: 'physical' },
    { id: 16, text: "The memories of your smile that I carry with me from when we were together", category: 'physical' },
    { id: 17, text: "Your humming during calls when you're doing something else", category: 'physical' },
    { id: 18, text: "The way you say my name — no one else says it like you", category: 'physical' },
    { id: 19, text: "Your breathing during those quiet moments on call — it's so calming", category: 'physical' },
    { id: 20, text: "How hearing your voice instantly makes any bad day better", category: 'physical' },

    // ============================================
    // EMOTIONAL (21-50)
    // ============================================
    { id: 21, text: "How you stayed up late just to talk to me even when you were exhausted", category: 'emotional' },
    { id: 22, text: "The way you understand my silence in chat when I need a moment", category: 'emotional' },
    { id: 23, text: "Your good morning texts that make waking up actually bearable", category: 'emotional' },
    { id: 24, text: "How you send me reels that remind you of us — it shows you think of me", category: 'emotional' },
    { id: 25, text: "The way you check if I've eaten, even from so far away", category: 'emotional' },
    { id: 26, text: "Your patience during the times when the distance feels too hard", category: 'emotional' },
    { id: 27, text: "How you make voice calls feel like we're in the same room", category: 'emotional' },
    { id: 28, text: "The little 'miss you' texts that come exactly when I need them", category: 'emotional' },
    { id: 29, text: "How you never let me go to sleep upset, no matter how late it is", category: 'emotional' },
    { id: 30, text: "Your determination to make this work despite the distance", category: 'emotional' },
    { id: 31, text: "The way you send me songs that made you think of me", category: 'emotional' },
    { id: 32, text: "How you remember tiny details from our conversations weeks later", category: 'emotional' },
    { id: 33, text: "Your support during my worst days, even through just a call", category: 'emotional' },
    { id: 34, text: "The way you send virtual hugs through text and somehow I feel them", category: 'emotional' },
    { id: 35, text: "How you never make me feel bad for being busy, just happy to hear from me", category: 'emotional' },
    { id: 36, text: "Your voice reassuring me when anxiety hits during late-night calls", category: 'emotional' },
    { id: 37, text: "The romantic reels you share that show exactly how you feel about us", category: 'emotional' },
    { id: 38, text: "How you make 'goodnight' feel like a promise, not a goodbye", category: 'emotional' },
    { id: 39, text: "Your ability to sense something's wrong just from my texting pattern", category: 'emotional' },
    { id: 40, text: "The way we fell for each other even harder after we had to be apart", category: 'emotional' },
    { id: 41, text: "How you make future plans with me like distance is just temporary", category: 'emotional' },
    { id: 42, text: "Your belief in us when I have doubting moments", category: 'emotional' },
    { id: 43, text: "The way you pause your day to take my call, no matter what", category: 'emotional' },
    { id: 44, text: "How loved you make me feel through emojis and words alone", category: 'emotional' },
    { id: 45, text: "Your vulnerability in voice notes that you could've just typed", category: 'emotional' },
    { id: 46, text: "The way you say 'I miss you' and I feel it in my chest", category: 'emotional' },
    { id: 47, text: "How you keep the conversations going, never letting us feel distant", category: 'emotional' },
    { id: 48, text: "Your excitement when we talk about finally meeting again", category: 'emotional' },
    { id: 49, text: "The way you make every text and call feel special", category: 'emotional' },
    { id: 50, text: "How you chose to love me even when it meant loving from far away", category: 'emotional' },

    // ============================================
    // QUIRKY (51-75)
    // ============================================
    { id: 51, text: "Your reaction texts to the reels I send — always overdramatic, always perfect", category: 'quirky' },
    { id: 52, text: "How you type 'hahahaha' when something is only mildly funny", category: 'quirky' },
    { id: 53, text: "The random memes you send at 2am that make zero sense", category: 'quirky' },
    { id: 54, text: "Your inability to end a call — 'okay bye... wait one more thing...'", category: 'quirky' },
    { id: 55, text: "How your voice gets higher when you're defending an unpopular opinion", category: 'quirky' },
    { id: 56, text: "The chaos of your stories during calls — jumping from topic to topic", category: 'quirky' },
    { id: 57, text: "Your dramatic voice notes that could win audio Oscars", category: 'quirky' },
    { id: 58, text: "How you screenshot our chats and then pretend you didn't", category: 'quirky' },
    { id: 59, text: "The way you send the same reel I sent you two days ago, forgetting I sent it", category: 'quirky' },
    { id: 60, text: "Your typing... appearing and disappearing fifty times before one message", category: 'quirky' },
    { id: 61, text: "How you narrate everything you're doing during calls like a podcast", category: 'quirky' },
    { id: 62, text: "The way you argue with autocorrect and lose", category: 'quirky' },
    { id: 63, text: "Your accidental voice notes that you forget to delete", category: 'quirky' },
    { id: 64, text: "How you send 47 messages instead of writing one long paragraph", category: 'quirky' },
    { id: 65, text: "The random screenshots of weird things you find online just for me", category: 'quirky' },
    { id: 66, text: "Your dramatic 'I'm going to sleep now' followed by texting for two more hours", category: 'quirky' },
    { id: 67, text: "How you pause mid-story on call to react to something near you", category: 'quirky' },
    { id: 68, text: "The way you double-text when I take more than 3 minutes to reply", category: 'quirky' },
    { id: 69, text: "Your specific emoji combinations that only I understand", category: 'quirky' },
    { id: 70, text: "How you hype up everything I share with you", category: 'quirky' },
    { id: 71, text: "The background chaos sounds during your calls — I love your world", category: 'quirky' },
    { id: 72, text: "Your habit of sending 'look at this' without any context", category: 'quirky' },
    { id: 73, text: "How you save our chat screenshots in a special folder you think I don't know about", category: 'quirky' },
    { id: 74, text: "The way you respond to reels with 'US' in all caps", category: 'quirky' },
    { id: 75, text: "Your competitive energy during our random debates", category: 'quirky' },

    // ============================================
    // CHARACTER (76-100)
    // ============================================
    { id: 76, text: "Your honesty, even when it's hard to say through text", category: 'character' },
    { id: 77, text: "How you defend your friends fiercely — I hear it in your voice", category: 'character' },
    { id: 78, text: "Your curiosity about my day, my life, my thoughts, everything", category: 'character' },
    { id: 79, text: "The way you apologize fully when you're wrong, no ego", category: 'character' },
    { id: 80, text: "How you never ghost even when you're overwhelmed — just a quick 'brb'", category: 'character' },
    { id: 81, text: "Your commitment to communication even when distance makes it hard", category: 'character' },
    { id: 82, text: "The effort you put into our calls — never distracted, always present", category: 'character' },
    { id: 83, text: "How genuine you are — even through just voice, I can tell you mean it", category: 'character' },
    { id: 84, text: "Your patience with my overthinking and reassuring me every single time", category: 'character' },
    { id: 85, text: "The way you trust me, even when we can't see what each other is doing", category: 'character' },
    { id: 86, text: "How you stay kind to everyone you talk about", category: 'character' },
    { id: 87, text: "Your passion for the things you love — I could listen for hours", category: 'character' },
    { id: 88, text: "The way you take responsibility without excuses", category: 'character' },
    { id: 89, text: "How you inspire me to be better even though we're apart", category: 'character' },
    { id: 90, text: "Your resilience when life gets tough — you amaze me", category: 'character' },
    { id: 91, text: "The way you balance being independent and being with me", category: 'character' },
    { id: 92, text: "How you never let distance become an excuse for anything", category: 'character' },
    { id: 93, text: "Your faithfulness — I never doubt us because of you", category: 'character' },
    { id: 94, text: "The way you support my dreams even from far away", category: 'character' },
    { id: 95, text: "How you grew from a friend into the love of my life", category: 'character' },
    { id: 96, text: "Your wisdom in conversations that guide me through hard times", category: 'character' },
    { id: 97, text: "The way you make me feel safe enough to be vulnerable over call", category: 'character' },
    { id: 98, text: "How you stayed consistent when long distance gets lonely", category: 'character' },
    { id: 99, text: "Your beautiful heart that I fell in love with as a friend first", category: 'character' },
    { id: 100, text: "The way you never gave up on us, not even once", category: 'character' },

    // ============================================
    // US - Our Relationship (101-110)
    // ============================================
    { id: 101, text: "How we went from friends to something more beautiful during that vacation", category: 'relationship' },
    { id: 102, text: "Our late-night calls that make the distance disappear completely", category: 'relationship' },
    { id: 103, text: "The way we share romantic reels like love letters for the digital age", category: 'relationship' },
    { id: 104, text: "How our friendship gave us a foundation strong enough for distance", category: 'relationship' },
    { id: 105, text: "The inside jokes that only work in our DMs", category: 'relationship' },
    { id: 106, text: "Our ability to make each other feel close despite the kilometers", category: 'relationship' },
    { id: 107, text: "How we're counting down to the day we finally meet again", category: 'relationship' },
    { id: 108, text: "The way voice calls with you feel like being wrapped in a warm blanket", category: 'relationship' },
    { id: 109, text: "Our shared playlists that play when we miss each other", category: 'relationship' },
    { id: 110, text: "The future we're building message by message, call by call 🥔💕", category: 'relationship' },
]

/**
 * Get reasons by category
 */
export const getReasonsByCategory = (category: ReasonCategory): Reason[] => {
    return reasons.filter(reason => reason.category === category)
}

/**
 * Get a random reason
 */
export const getRandomReason = (): Reason => {
    return reasons[Math.floor(Math.random() * reasons.length)]
}

/**
 * Search reasons by text
 */
export const searchReasons = (query: string): Reason[] => {
    const lowercaseQuery = query.toLowerCase()
    return reasons.filter(reason =>
        reason.text.toLowerCase().includes(lowercaseQuery)
    )
}

/**
 * Get total count by category
 */
export const getCategoryCounts = (): Record<ReasonCategory, number> => {
    return reasons.reduce((acc, reason) => {
        acc[reason.category] = (acc[reason.category] || 0) + 1
        return acc
    }, {} as Record<ReasonCategory, number>)
}

export default reasons
