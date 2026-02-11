import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCountdown from '../hooks/useCountdown'
import CountdownTimer from '../components/CountdownTimer'
import GiftReveal from '../components/GiftReveal'
import EasterEgg from '../components/EasterEgg'

export default function Landing() {
  const [searchParams] = useSearchParams()
  const debugReveal = searchParams.get('reveal') === 'true'
  const { days, hours, minutes, seconds, isExpired } = useCountdown(debugReveal)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <EasterEgg />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 sm:mb-14"
      >
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-wine font-bold mb-3">
          Reasons I Love You
        </h1>
        <p className="font-body text-wine/50 text-base sm:text-lg">
          A Valentine's surprise, just for you
        </p>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-10 sm:mb-14"
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
        className="w-full max-w-md"
      >
        <GiftReveal isRevealed={isExpired} />
      </motion.div>

      {/* Footer hint */}
      {!isExpired && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-wine/30 font-body text-sm text-center"
        >
          Something special is coming...
        </motion.p>
      )}
    </div>
  )
}
