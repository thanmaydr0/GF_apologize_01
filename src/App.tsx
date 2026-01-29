import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

function App() {
    return (
        <div className="min-h-screen bg-gradient-romantic">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Floating Heart */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="mb-8"
                    >
                        <FaHeart className="text-6xl text-primary-200 mx-auto animate-heartbeat" />
                    </motion.div>

                    {/* Main Heading */}
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-secondary-500 mb-6">
                        A Letter From
                        <span className="block text-gradient-romantic">My Heart</span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-secondary-300 font-sans leading-relaxed mb-10"
                    >
                        Sometimes words fail us, but love never does.
                        <br />
                        This is my attempt to say what my heart feels.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary-100 hover:bg-primary-200 text-secondary-500 font-medium px-8 py-4 rounded-full text-lg shadow-romantic hover:shadow-romantic-lg transition-all duration-300"
                    >
                        Begin Reading
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-10"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-6 h-10 border-2 border-primary-100 rounded-full flex justify-center pt-2"
                    >
                        <motion.div className="w-1.5 h-1.5 bg-primary-200 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Placeholder for more sections */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-secondary-500 mb-6">
                        More sections coming soon...
                    </h2>
                    <p className="text-secondary-300">
                        This is where the love story unfolds.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default App
