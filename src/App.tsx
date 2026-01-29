import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    SectionContainer,
    SectionHeader,
    AnimatedText
} from './components/ui'
import { Hero } from './components/sections'

function App() {
    return (
        <div className="min-h-screen">
            {/* ============================================
          HERO SECTION
          ============================================ */}
            <Hero nextSectionId="reasons" />

            {/* ============================================
          REASONS SECTION
          ============================================ */}
            <SectionContainer
                id="reasons"
                spacing="lg"
                width="wide"
                background="warm"
                ariaLabel="Reasons I love you"
            >
                <SectionHeader
                    title="Why You Mean Everything"
                    subtitle="Every moment with you has taught me what it means to truly love someone."
                />

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    {[
                        { title: 'Your Smile', content: 'The way your eyes light up when you smile makes everything feel right in the world.', emoji: '💕' },
                        { title: 'Your Kindness', content: 'Your compassion for others inspires me to be a better person every single day.', emoji: '✨' },
                        { title: 'Our Memories', content: 'Every moment we\'ve shared has become a treasured chapter in my heart.', emoji: '🌸' },
                        { title: 'Your Strength', content: 'The way you face challenges with grace gives me courage when I need it most.', emoji: '🦋' },
                        { title: 'Your Laughter', content: 'That sound is my favorite melody, the one I want to hear every day of my life.', emoji: '🎵' },
                        { title: 'Just You', content: 'Simply being near you makes everything feel like it\'s going to be okay.', emoji: '💝' },
                    ].map((reason) => (
                        <motion.div
                            key={reason.title}
                            variants={{
                                hidden: { opacity: 0, y: 24 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <Card variant="elevated" hoverable>
                                <CardHeader>
                                    <span className="text-3xl mb-3 block">{reason.emoji}</span>
                                    <CardTitle>{reason.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{reason.content}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </SectionContainer>

            {/* ============================================
          LETTER SECTION
          ============================================ */}
            <SectionContainer
                id="letter"
                spacing="lg"
                width="narrow"
                ariaLabel="A letter to you"
            >
                <Card variant="glass" padding="lg">
                    <AnimatedText
                        as="h2"
                        animation="fadeInUp"
                        className="text-center mb-8 text-secondary-500"
                    >
                        To My Dearest Potato
                    </AnimatedText>

                    <div className="space-y-6 text-secondary-400 leading-relaxed">
                        <AnimatedText animation="fadeIn" delay={0.2}>
                            I've written this letter a hundred times in my mind, each time searching for the perfect words. But I've come to realize that perfect words don't exist for feelings this deep.
                        </AnimatedText>

                        <AnimatedText animation="fadeIn" delay={0.4}>
                            What I can offer you is the truth: I am sorry. Not just for the moments that hurt, but for every time I failed to show you just how much you mean to me.
                        </AnimatedText>

                        <AnimatedText animation="fadeIn" delay={0.6}>
                            You are my favorite story, and I hope it's one we can keep writing together. Every chapter, every page, every word — I want to share them all with you.
                        </AnimatedText>

                        <AnimatedText animation="fadeIn" delay={0.8}>
                            Please know that my heart belongs to you, and it always will. 🥔💕
                        </AnimatedText>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-10 text-center"
                    >
                        <p className="font-serif italic text-secondary-300">
                            Forever yours,
                            <br />
                            <span className="text-gradient-romantic text-xl font-medium mt-2 block">
                                With all my love
                            </span>
                        </p>
                    </motion.div>
                </Card>
            </SectionContainer>

            {/* ============================================
          CALL TO ACTION
          ============================================ */}
            <SectionContainer spacing="md" background="blush" ariaLabel="Next steps">
                <SectionHeader
                    title="What Comes Next"
                    subtitle="I'm ready to put in the work, if you'll let me."
                />

                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                    <Button variant="primary" size="lg" fullWidth>
                        Let's Talk 💬
                    </Button>
                    <Button variant="outline" size="lg" fullWidth>
                        Read More
                    </Button>
                </div>
            </SectionContainer>

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
                </motion.div>
            </footer>
        </div>
    )
}

export default App
