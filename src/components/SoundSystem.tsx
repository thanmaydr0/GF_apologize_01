import React, { createContext, useContext, useCallback, useRef, useState, useEffect } from 'react'

// ============================================
// TYPES
// ============================================
type SoundType = 'click' | 'pop' | 'sparkle' | 'heart' | 'swoosh'

interface SoundContextValue {
    playSound: (type: SoundType) => void
    isMuted: boolean
    setMuted: (muted: boolean) => void
    isMusicPlaying: boolean
    toggleMusic: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

// ============================================
// SOUND PROVIDER
// ============================================
export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setMuted] = useState(false)
    const [isMusicPlaying, setMusicPlaying] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    const audioCtxRef = useRef<AudioContext | null>(null)
    const musicRef = useRef<HTMLAudioElement | null>(null)

    // Initialize music element on mount
    useEffect(() => {
        const audio = new Audio()
        audio.src = '/bgm.mp3'
        audio.loop = true
        audio.volume = 0.25
        audio.preload = 'auto'
        musicRef.current = audio

        audio.addEventListener('play', () => setMusicPlaying(true))
        audio.addEventListener('pause', () => setMusicPlaying(false))

        return () => {
            audio.pause()
            audio.src = ''
        }
    }, [])

    // Start music on first user interaction
    useEffect(() => {
        const startOnInteraction = () => {
            if (hasInteracted) return
            setHasInteracted(true)

            // Create AudioContext
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            }

            // Start music
            if (musicRef.current && musicRef.current.paused) {
                musicRef.current.play().catch(err => {
                    console.log('Play failed:', err)
                })
            }
        }

        // Listen for any interaction
        document.addEventListener('click', startOnInteraction)
        document.addEventListener('touchstart', startOnInteraction)
        document.addEventListener('keydown', startOnInteraction)
        document.addEventListener('scroll', startOnInteraction, { passive: true })

        return () => {
            document.removeEventListener('click', startOnInteraction)
            document.removeEventListener('touchstart', startOnInteraction)
            document.removeEventListener('keydown', startOnInteraction)
            document.removeEventListener('scroll', startOnInteraction)
        }
    }, [hasInteracted])

    // Toggle music
    const toggleMusic = useCallback(() => {
        if (!musicRef.current) return

        if (musicRef.current.paused) {
            musicRef.current.play().catch(() => { })
        } else {
            musicRef.current.pause()
        }
    }, [])

    // Get or create audio context
    const getAudioContext = useCallback((): AudioContext | null => {
        if (!audioCtxRef.current) {
            try {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            } catch {
                return null
            }
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume()
        }
        return audioCtxRef.current
    }, [])

    // Play sound effect
    const playSound = useCallback((type: SoundType) => {
        if (isMuted) return

        const ctx = getAudioContext()
        if (!ctx) return

        try {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.type = 'sine'
            const t = ctx.currentTime

            switch (type) {
                case 'click':
                    osc.frequency.setValueAtTime(800, t)
                    osc.frequency.exponentialRampToValueAtTime(400, t + 0.05)
                    gain.gain.setValueAtTime(0.4, t)
                    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05)
                    osc.start(t)
                    osc.stop(t + 0.05)
                    break
                case 'pop':
                    osc.frequency.setValueAtTime(600, t)
                    osc.frequency.exponentialRampToValueAtTime(200, t + 0.08)
                    gain.gain.setValueAtTime(0.5, t)
                    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08)
                    osc.start(t)
                    osc.stop(t + 0.08)
                    break
                case 'sparkle':
                    osc.frequency.setValueAtTime(1500, t)
                    osc.frequency.exponentialRampToValueAtTime(3000, t + 0.1)
                    gain.gain.setValueAtTime(0.3, t)
                    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12)
                    osc.start(t)
                    osc.stop(t + 0.12)
                    break
                case 'heart':
                    osc.frequency.setValueAtTime(523, t)
                    osc.frequency.setValueAtTime(659, t + 0.08)
                    gain.gain.setValueAtTime(0.35, t)
                    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18)
                    osc.start(t)
                    osc.stop(t + 0.18)
                    break
                case 'swoosh':
                    osc.frequency.setValueAtTime(300, t)
                    osc.frequency.exponentialRampToValueAtTime(1000, t + 0.12)
                    gain.gain.setValueAtTime(0.25, t)
                    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12)
                    osc.start(t)
                    osc.stop(t + 0.12)
                    break
            }
        } catch (e) {
            console.warn('Sound error:', e)
        }
    }, [isMuted, getAudioContext])

    // Cleanup
    useEffect(() => {
        return () => {
            audioCtxRef.current?.close()
        }
    }, [])

    return (
        <SoundContext.Provider value={{
            playSound,
            isMuted,
            setMuted,
            isMusicPlaying,
            toggleMusic,
        }}>
            {children}
        </SoundContext.Provider>
    )
}

// Hook
export const useSound = () => {
    const ctx = useContext(SoundContext)
    if (!ctx) {
        return {
            playSound: () => { },
            isMuted: false,
            setMuted: () => { },
            isMusicPlaying: false,
            toggleMusic: () => { },
        }
    }
    return ctx
}

export type { SoundType }
