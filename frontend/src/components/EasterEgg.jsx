import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EasterEgg() {
  const [revealed, setRevealed] = useState(false)

  return (
    <>
      {/* Hidden heart trigger in the corner */}
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setRevealed(true)}
        className="fixed top-4 right-4 z-40 w-8 h-8 flex items-center justify-center text-rose-soft/20 hover:text-rose-soft/60 transition-colors cursor-pointer"
        title=""
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.button>

      {/* Secret message modal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setRevealed(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-cream rounded-2xl p-8 max-w-sm text-center shadow-2xl border border-rose-soft/30"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-5xl mb-4">💝</div>
              <p className="font-display text-xl text-wine mb-2">
                You found the secret!
              </p>
              <p className="font-body text-charcoal/70 leading-relaxed">
                You're the most amazing person I know. Finding you was the best thing that ever happened to me. I love you more than words could ever express.
              </p>
              <button
                onClick={() => setRevealed(false)}
                className="mt-6 px-6 py-2 bg-rose-deep text-white rounded-full font-body text-sm cursor-pointer hover:bg-wine transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
