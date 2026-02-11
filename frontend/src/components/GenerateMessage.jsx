import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateMessage } from '../api/loveMessages'

const categories = ['sweet', 'flirty', 'funny', 'deep', 'good-morning', 'good-night']
const moods = ['playful', 'romantic', 'poetic', 'casual']

export default function GenerateMessage() {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (loading || cooldown) return

    setLoading(true)
    setMessage(null)

    try {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const mood = moods[Math.floor(Math.random() * moods.length)]
      const data = await generateMessage(category, mood)
      setMessage(data.message)
    } catch {
      setMessage("You are the reason I believe in love. Every day with you is my favorite day.")
    } finally {
      setLoading(false)
      setCooldown(true)
      setTimeout(() => setCooldown(false), 5000)
    }
  }, [loading, cooldown])

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGenerate}
        disabled={loading || cooldown}
        className={`px-8 py-4 rounded-full font-body font-semibold text-white shadow-lg transition-all cursor-pointer ${
          loading || cooldown
            ? 'bg-rose-soft cursor-not-allowed'
            : 'bg-gradient-to-r from-rose-deep to-wine hover:shadow-xl'
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            Writing you something special...
          </span>
        ) : cooldown ? (
          'Wait a moment...'
        ) : (
          'Get a New Love Message'
        )}
      </motion.button>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mt-6 p-6 bg-cream rounded-2xl shadow-md border border-rose-soft/30"
          >
            <p className="font-display text-lg text-charcoal leading-relaxed italic">
              "{message}"
            </p>
            <div className="mt-3 text-rose-deep text-2xl">
              {['💕', '💗', '💖', '✨', '🥰'][Math.floor(Math.random() * 5)]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
