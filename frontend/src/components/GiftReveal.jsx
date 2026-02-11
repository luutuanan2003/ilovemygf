import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fireConfetti } from './Confetti'
import personalData from '../data/personal-messages.json'

export default function GiftReveal({ isRevealed }) {
  const [showMessage, setShowMessage] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { gift_reveal } = personalData

  // Pre-fetch the gift image
  useEffect(() => {
    const img = new Image()
    img.src = gift_reveal.image_path
    img.onload = () => setImageLoaded(true)
  }, [])

  // Trigger confetti and message when revealed
  useEffect(() => {
    if (isRevealed) {
      const confettiTimer = setTimeout(() => fireConfetti(), 800)
      const messageTimer = setTimeout(() => setShowMessage(true), 1500)
      return () => {
        clearTimeout(confettiTimer)
        clearTimeout(messageTimer)
      }
    }
  }, [isRevealed])

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Gift image container */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        animate={{
          filter: isRevealed ? 'blur(0px) grayscale(0)' : 'blur(20px) grayscale(0.5)',
          scale: isRevealed ? 1 : 0.95,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src={gift_reveal.image_path}
          alt="Your special surprise"
          className="w-full h-auto object-cover aspect-square"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Padlock overlay (before reveal) */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-charcoal/30 flex flex-col items-center justify-center backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg className="w-16 h-16 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <p className="mt-4 text-cream text-lg font-display text-center px-4">
                {gift_reveal.teaser_text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Reveal message and CTA */}
      <AnimatePresence>
        {showMessage && isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="font-display text-xl sm:text-2xl text-wine mb-6">
              {gift_reveal.reveal_message}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('love-cards')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-rose-deep text-white font-body font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              See Your Cards
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
