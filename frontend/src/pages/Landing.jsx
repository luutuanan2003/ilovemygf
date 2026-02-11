import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCountdown from '../hooks/useCountdown'
import CountdownTimer from '../components/CountdownTimer'
import { AsciiFlower } from '../components/CountdownTimer'
import GiftReveal from '../components/GiftReveal'
import CardGallery from '../components/CardGallery'
import GenerateMessage from '../components/GenerateMessage'
import EasterEgg from '../components/EasterEgg'

export default function Landing() {
  const [searchParams] = useSearchParams()
  const debugReveal = searchParams.get('reveal') === 'true'
  const { days, hours, minutes, seconds, isExpired } = useCountdown(debugReveal)

  return (
    <div className="min-h-[100dvh] flex flex-col items-center px-3 sm:px-4 py-6 sm:py-8 relative z-10">
      <EasterEgg />

      {/* Decorative flowers top */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4 opacity-40">
        <AsciiFlower size="sm" className="hidden min-[400px]:block" />
        <AsciiFlower size="md" />
        <AsciiFlower size="sm" className="hidden min-[400px]:block" />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-10 md:mb-14"
      >
        <h1 className="font-display text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl text-wine font-bold mb-2 sm:mb-3 px-2">
          Reasons I Love You
        </h1>
        <p className="font-body text-wine/50 text-sm min-[400px]:text-base sm:text-lg">
          A Valentine's surprise, just for you
        </p>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 sm:mb-10 md:mb-14 w-full flex justify-center"
      >
        <CountdownTimer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isExpired={isExpired}
        />
      </motion.div>

      {/* Gift Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-full max-w-md px-2"
      >
        <GiftReveal isRevealed={isExpired} />
      </motion.div>

      {/* Flower divider */}
      <div className="flex items-center justify-center gap-2 my-8 sm:my-12 opacity-30">
        <div className="h-px w-12 sm:w-20 bg-rose-deep/40"></div>
        <AsciiFlower size="sm" />
        <div className="h-px w-12 sm:w-20 bg-rose-deep/40"></div>
      </div>

      {/* Cards */}
      <motion.div
        id="love-cards"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        <CardGallery />
      </motion.div>

      {/* Flower divider */}
      <div className="flex items-center justify-center gap-2 my-8 sm:my-12 opacity-30">
        <AsciiFlower size="sm" />
        <AsciiFlower size="sm" className="hidden sm:block" />
      </div>

      {/* Generate New Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-md mb-12"
      >
        <h2 className="font-display text-2xl text-wine text-center mb-6">
          Want Another Love Message?
        </h2>
        <GenerateMessage />
      </motion.div>

      {/* Bottom flower garden */}
      <div className="flex items-center justify-center gap-1 sm:gap-4 opacity-25 flex-wrap">
        <AsciiFlower size="sm" />
        <AsciiFlower size="md" className="hidden sm:block" />
        <AsciiFlower size="sm" />
        <AsciiFlower size="md" className="hidden sm:block" />
        <AsciiFlower size="sm" />
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-wine/30 font-body text-xs">
        Made with love, just for you
      </div>
    </div>
  )
}
