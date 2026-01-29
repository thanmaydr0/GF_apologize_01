import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from 'react-icons/fa'
import { useSound } from './SoundSystem'

export const MusicPlayer: React.FC = () => {
    const { isMuted, setMuted, isMusicPlaying, toggleMusic } = useSound()
    const [isExpanded, setIsExpanded] = useState(false)

    const handleMainClick = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute bottom-14 right-0 bg-white rounded-2xl shadow-lg p-3 flex flex-col gap-2"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    >
                        {/* Play/Pause Music */}
                        <button
                            onClick={toggleMusic}
                            className="w-10 h-10 rounded-full bg-primary-100 hover:bg-primary-200 
                                     flex items-center justify-center text-primary-500 transition-colors"
                            title={isMusicPlaying ? 'Pause music' : 'Play music'}
                        >
                            {isMusicPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                        </button>

                        {/* Mute/Unmute Sounds */}
                        <button
                            onClick={() => setMuted(!isMuted)}
                            className="w-10 h-10 rounded-full bg-secondary-100 hover:bg-secondary-200 
                                     flex items-center justify-center text-secondary-500 transition-colors"
                            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                        >
                            {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main music button */}
            <motion.button
                onClick={handleMainClick}
                className={`
                    w-12 h-12 rounded-full shadow-lg
                    flex items-center justify-center
                    transition-colors
                    ${isMusicPlaying
                        ? 'bg-primary-300 text-white'
                        : 'bg-white text-primary-400'}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaMusic size={18} />

                {/* Audio indicator */}
                {isMusicPlaying && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}
            </motion.button>
        </motion.div>
    )
}

export default MusicPlayer
