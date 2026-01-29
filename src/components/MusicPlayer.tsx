import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from 'react-icons/fa'
import { useSound } from './SoundSystem'

// Floating music controls
export const MusicPlayer: React.FC = () => {
    const { isMuted, setMuted, isMusicPlaying, toggleMusic, playSound } = useSound()
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        playSound('pop')
        setIsOpen(!isOpen)
    }

    const handlePlayPause = () => {
        playSound('click')
        toggleMusic()
    }

    const handleMute = () => {
        playSound('click')
        setMuted(!isMuted)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
            {/* Expanded controls */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-primary-100"
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    >
                        {/* Play/Pause */}
                        <button
                            onClick={handlePlayPause}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isMusicPlaying ? 'bg-primary-200 text-white' : 'bg-secondary-100 text-secondary-500'
                                }`}
                            aria-label={isMusicPlaying ? 'Pause' : 'Play'}
                        >
                            {isMusicPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-0.5" />}
                        </button>

                        {/* Mute */}
                        <button
                            onClick={handleMute}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-100 text-red-400' : 'bg-secondary-100 text-secondary-500'
                                }`}
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                        </button>

                        {/* Visualizer */}
                        {isMusicPlaying && !isMuted && (
                            <div className="flex gap-0.5 items-end h-4">
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-primary-300 rounded-full"
                                        animate={{ height: ['30%', '100%', '50%', '80%', '30%'] }}
                                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main toggle button */}
            <motion.button
                onClick={handleToggle}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${isMusicPlaying
                        ? 'bg-gradient-to-br from-primary-200 to-primary-300 text-white'
                        : 'bg-white text-secondary-400 border border-secondary-100'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Music controls"
            >
                <FaMusic className={isMusicPlaying ? 'animate-pulse' : ''} />
            </motion.button>
        </div>
    )
}

export default MusicPlayer
