import { motion } from 'framer-motion'
import { FaHeart, FaArrowRight } from 'react-icons/fa'
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

function App() {
    return (
        <div className="min-h-screen">
            {/* ============================================
          HERO SECTION
          ============================================ */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-radial-pink opacity-50"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-gradient-radial-pink opacity-30"
                        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="text-center max-w-3xl mx-auto relative z-10"
                >
                    {/* Floating Heart */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="mb-8"
                    >
                        <FaHeart className="text-6xl text-primary-200 mx-auto animate-heartbeat" />
                    </motion.div>

                    {/* Main Heading with Character Animation */}
                    <AnimatedText
                        as="h1"
                        animation="wordReveal"
                        className="font-serif text-secondary-500 mb-6"
                    >
                        A Letter From My Heart
                    </AnimatedText>

                    {/* Gradient Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-lg md:text-xl text-secondary-300 leading-relaxed mb-10 max-w-xl mx-auto"
                    >
                        Sometimes words fail us, but love never does.
                        <br />
                        <span className="text-gradient-romantic font-medium">
                            This is my attempt to say what my heart feels.
                        </span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button size="lg" rightIcon={<FaArrowRight />}>
                            Begin Reading
                        </Button>
                        <Button variant="outline" size="lg">
                            Our Story
                        </Button>
                    </motion.div>
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
                        className="w-6 h-10 border-2 border-primary-200 rounded-full flex justify-center pt-2"
                    >
                        <motion.div className="w-1.5 h-1.5 bg-primary-300 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ============================================
          REASONS SECTION (Card Demo)
          ============================================ */}
            <SectionContainer
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
                        { title: 'Your Smile', content: 'The way your eyes light up when you smile makes everything feel right in the world.' },
                        { title: 'Your Kindness', content: 'Your compassion for others inspires me to be a better person every single day.' },
                        { title: 'Our Memories', content: 'Every moment we\'ve shared has become a treasured chapter in my heart.' },
                    ].map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            variants={{
                                hidden: { opacity: 0, y: 24 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <Card variant="elevated" hoverable>
                                <CardHeader>
                                    <span className="text-3xl mb-3 block">
                                        {['💕', '✨', '🌸'][index]}
                                    </span>
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
          LETTER SECTION (AnimatedText Demo)
          ============================================ */}
            <SectionContainer spacing="lg" width="narrow" ariaLabel="A letter to you">
                <Card variant="glass" padding="lg">
                    <AnimatedText
                        as="h2"
                        animation="fadeInUp"
                        className="text-center mb-8 text-secondary-500"
                    >
                        To My Dearest
                    </AnimatedText>

                    <div className="space-y-6 text-secondary-400">
                        <AnimatedText animation="fadeIn" delay={0.2}>
                            I've written this letter a hundred times in my mind, each time searching for the perfect words. But I've come to realize that perfect words don't exist for feelings this deep.
                        </AnimatedText>

                        <AnimatedText animation="fadeIn" delay={0.4}>
                            What I can offer you is the truth: I am sorry. Not just for the moments that hurt, but for every time I failed to show you just how much you mean to me.
                        </AnimatedText>

                        <AnimatedText animation="fadeIn" delay={0.6}>
                            You are my favorite story, and I hope it's one we can keep writing together.
                        </AnimatedText>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="mt-10 text-center"
                    >
                        <p className="font-serif italic text-secondary-300">
                            Forever yours,
                            <br />
                            <span className="text-gradient-romantic text-lg">With all my love</span>
                        </p>
                    </motion.div>
                </Card>
            </SectionContainer>

            {/* ============================================
          BUTTON VARIANTS DEMO
          ============================================ */}
            <SectionContainer spacing="md" background="blush" ariaLabel="Actions">
                <SectionHeader
                    title="What Comes Next"
                    subtitle="I'm ready to put in the work, if you'll let me."
                />

                <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="primary">Primary Action</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline Style</Button>
                    <Button variant="ghost">Ghost Button</Button>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
            </SectionContainer>

            {/* ============================================
          FOOTER
          ============================================ */}
            <footer className="py-12 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <FaHeart className="text-2xl text-primary-200 mx-auto mb-4 animate-pulse-soft" />
                    <p className="text-secondary-300 text-sm">
                        Made with love, for the one who holds my heart
                    </p>
                </motion.div>
            </footer>
        </div>
    )
}

export default App
