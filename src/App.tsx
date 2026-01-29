import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { Hero, Apology, PotatoPuns, ReasonsILoveYou, ScratchCards, Countdown, Closure } from './components/sections'
import { Navigation } from './components/Navigation'
import { LoadingScreen } from './components/LoadingScreen'
import { MusicPlayer } from './components/MusicPlayer'
import { SoundProvider } from './components/SoundSystem'

function App() {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <SoundProvider>
            {/* Loading Screen */}
            <LoadingScreen
                minDuration={2500}
                message="Preparing something special"
                onComplete={() => setIsLoading(false)}
            />

            {/* Main App - render but hidden until loading complete */}
            <div className={`min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
                {/* Navigation */}
                <Navigation />

                {/* Floating Music Player */}
                <MusicPlayer />

                {/* ============================================
                   HERO SECTION
                   ============================================ */}
                <Hero nextSectionId="apology" />

                {/* ============================================
                   APOLOGY SECTION
                   ============================================ */}
                <Apology />

                {/* ============================================
                   POTATO PUNS SECTION
                   ============================================ */}
                <PotatoPuns />

                {/* ============================================
                   100+ REASONS I LOVE YOU SECTION
                   ============================================ */}
                <ReasonsILoveYou />

                {/* ============================================
                   SCRATCH CARDS SECTION
                   ============================================ */}
                <ScratchCards />

                {/* ============================================
                   COUNTDOWN SECTION
                   ============================================ */}
                <Countdown
                    targetDate="2026-02-02T17:00:00+05:30"
                    heading="Until I Can Hold You Again"
                    subheading="Every second brings us closer"
                />

                {/* ============================================
                   CLOSURE SECTION
                   ============================================ */}
                <Closure
                    whatsappNumber="919113896649"
                    instagramUsername="atoderx"
                    phoneNumber="+919113896649"
                />

                {/* ============================================
                   FOOTER
                   ============================================ */}
                <footer className="py-16 px-6 text-center bg-gradient-to-t from-secondary-50 to-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <FaHeart className="text-3xl text-primary-200 mx-auto mb-4" />
                        </motion.div>
                        <p className="text-secondary-300 text-sm max-w-md mx-auto">
                            Made with love, for the one who holds my heart.
                            <br />
                            <span className="text-primary-300">Every pixel, every word — it's all for you.</span>
                        </p>
                        <p className="mt-4 text-xs text-secondary-200">
                            🥔💕
                        </p>
                    </motion.div>
                </footer>
            </div>
        </SoundProvider>
    )
}

export default App

