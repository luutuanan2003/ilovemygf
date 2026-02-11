import { motion } from 'framer-motion'
import FlipDigit from './FlipDigit'

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <FlipDigit value={value} />
      <span className="text-xs sm:text-sm font-body text-wine/70 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center pb-6">
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold animate-pulse-slow select-none">
        :
      </span>
    </div>
  )
}

export default function CountdownTimer({ days, hours, minutes, seconds, isExpired }) {
  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-rose-deep mb-2">
          Happy Valentine's Day!
        </h2>
        <p className="text-wine/60 font-body text-lg">The wait is over...</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
    >
      <TimeUnit value={days} label="Days" />
      <Separator />
      <TimeUnit value={hours} label="Hours" />
      <Separator />
      <TimeUnit value={minutes} label="Minutes" />
      <Separator />
      <TimeUnit value={seconds} label="Seconds" />
    </motion.div>
  )
}
