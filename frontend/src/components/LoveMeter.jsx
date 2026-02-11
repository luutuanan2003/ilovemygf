import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoveMeter() {
  const [started, setStarted] = useState(false)
  const [counting, setCounting] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [finalValue, setFinalValue] = useState(null)

  const startMeter = () => {
    if (counting) return
    setStarted(true)
    setCounting(true)
    setFinalValue(null)

    // Target: random between 95-100
    const target = Math.floor(Math.random() * 6) + 95

    // Dramatic count-up animation
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 8 + 2
      if (current >= target) {
        current = target
        clearInterval(interval)
        setPercentage(target)
        setFinalValue(target)
        setCounting(false)
      } else {
        setPercentage(Math.floor(current))
      }
    }, 80)
  }

  return (
    <div className="w-full max-w-sm mx-auto text-center">
      <h3 className="font-display text-xl sm:text-2xl text-wine mb-4">
        Love Meter
      </h3>

      {/* Heart gauge */}
      <div className="relative w-40 h-40 mx-auto mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background heart path */}
          <path
            d="M50 88 C25 65, 5 50, 5 30 C5 15, 15 5, 30 5 C38 5, 45 10, 50 20 C55 10, 62 5, 70 5 C85 5, 95 15, 95 30 C95 50, 75 65, 50 88Z"
            fill="none"
            stroke="#FFE4E6"
            strokeWidth="3"
          />
          {/* Filled heart with clip */}
          <defs>
            <clipPath id="heartClip">
              <path d="M50 88 C25 65, 5 50, 5 30 C5 15, 15 5, 30 5 C38 5, 45 10, 50 20 C55 10, 62 5, 70 5 C85 5, 95 15, 95 30 C95 50, 75 65, 50 88Z" />
            </clipPath>
          </defs>
          <motion.rect
            clipPath="url(#heartClip)"
            x="0"
            width="100"
            fill="url(#heartGradient)"
            animate={{
              y: started ? 100 - percentage : 100,
              height: started ? percentage : 0,
            }}
            transition={{ duration: 0.1 }}
          />
          <defs>
            <linearGradient id="heartGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#FDA4AF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-display font-bold text-2xl ${
            finalValue ? 'text-white' : 'text-rose-deep'
          }`}>
            {started ? `${percentage}%` : '?'}
          </span>
        </div>
      </div>

      {/* Result text */}
      <AnimatePresence>
        {finalValue && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-wine text-sm mb-4"
          >
            {finalValue === 100 ? 'MAXIMUM LOVE DETECTED!' : `${finalValue}% - Off the charts!`}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startMeter}
        disabled={counting}
        className={`px-6 py-2 rounded-full font-body font-medium text-sm text-white shadow-md cursor-pointer ${
          counting ? 'bg-rose-soft' : 'bg-rose-deep hover:shadow-lg'
        }`}
      >
        {counting ? 'Calculating...' : started ? 'Try Again' : 'Calculate Our Love'}
      </motion.button>
    </div>
  )
}
