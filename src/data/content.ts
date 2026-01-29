/**
 * Content data for the romantic reconciliation website
 * This file contains all the text content, reasons, and letters
 */

export interface Reason {
    id: number
    title: string
    description: string
    icon?: string
}

export interface Letter {
    id: number
    title: string
    content: string
    date?: string
}

// Example reasons data structure
export const reasons: Reason[] = [
    {
        id: 1,
        title: "Your Smile",
        description: "The way your eyes light up when you smile makes everything feel right.",
    },
    {
        id: 2,
        title: "Your Kindness",
        description: "Your compassion for others inspires me to be a better person.",
    },
    {
        id: 3,
        title: "Our Memories",
        description: "Every moment we've shared has become a treasured memory.",
    },
    // Add more reasons...
]

// Example letter data structure
export const letters: Letter[] = [
    {
        id: 1,
        title: "A Letter of Apology",
        content: "Words cannot express how sorry I am...",
        date: "2024",
    },
    // Add more letters...
]

// Timeline events
export interface TimelineEvent {
    id: number
    date: string
    title: string
    description: string
    image?: string
}

export const timeline: TimelineEvent[] = [
    // Add timeline events...
]
