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
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8 relative z-10">
      <EasterEgg />

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

      {/* Footer hint */}
      {!isExpired && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 sm:mt-12 text-wine/30 font-body text-xs sm:text-sm text-center"
        >
          Something special is coming...
        </motion.p>
      )}
    </div>
  )
}
