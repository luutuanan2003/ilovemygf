import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FlipDigit({ value }) {
  const [current, setCurrent] = useState(value)
  const [previous, setPrevious] = useState(value)
  const [flipping, setFlipping] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (value !== current) {
      setPrevious(current)
      setCurrent(value)
      setFlipping(true)
      const timer = setTimeout(() => setFlipping(false), 600)
      return () => clearTimeout(timer)
    }
  }, [value])

  const digitStyle = "w-[44px] h-[68px] sm:w-[56px] sm:h-[80px] md:w-[64px] md:h-[92px] rounded-lg flex items-center justify-center font-display font-bold text-3xl sm:text-4xl md:text-5xl select-none"

  return (
    <div className="flip-digit relative">
      <div className={`${digitStyle} bg-gradient-to-b from-charcoal to-charcoal/90 text-gold shadow-lg`}>
        {/* Static current value (always shown as base layer) */}
        <span>{String(current).padStart(2, '0')}</span>
      </div>

      {/* Flip animation overlay */}
      <AnimatePresence>
        {flipping && (
          <motion.div
            key={`flip-${previous}-${current}`}
            className={`${digitStyle} bg-gradient-to-b from-charcoal to-charcoal/90 text-gold shadow-lg absolute inset-0`}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            style={{ transformOrigin: "bottom center", backfaceVisibility: "hidden" }}
          >
            <span>{String(previous).padStart(2, '0')}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
