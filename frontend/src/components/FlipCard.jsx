import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { generateMessage } from '../api/loveMessages'
import { fireFinaleConfetti } from './Confetti'

export default function FlipCard({ card, isUnlocked }) {
  const [aiMessage, setAiMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!isUnlocked) return
    const cached = localStorage.getItem(`valentine-ai-msg-${card.id}`)
    if (cached) {
      setAiMessage(cached)
      setRevealed(true)
      return
    }
  }, [isUnlocked, card.id])

  const fetchAiMessage = async () => {
    if (loading || aiMessage) return
    setLoading(true)
    try {
      const moods = ['playful', 'romantic', 'poetic', 'casual']
      const mood = moods[Math.floor(Math.random() * moods.length)]
      const data = await generateMessage(card.category, mood)
      setAiMessage(data.message)
      localStorage.setItem(`valentine-ai-msg-${card.id}`, data.message)
      if (card.is_finale) {
        fireFinaleConfetti()
      }
    } catch {
      setAiMessage("Every moment with you is a treasure I hold close to my heart.")
    } finally {
      setLoading(false)
      setRevealed(true)
    }
  }

  const handleClick = () => {
    if (!isUnlocked) return
    if (!revealed) {
      fetchAiMessage()
    }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <motion.div
        className={`w-full h-64 sm:h-72 rounded-2xl shadow-lg border-2 p-5 flex flex-col items-center justify-center text-center ${
          isUnlocked
            ? revealed
              ? 'bg-gradient-to-br from-cream to-rose-blush border-rose-soft'
              : 'bg-cream border-rose-soft cursor-pointer'
            : 'bg-gray-100 border-gray-200'
        }`}
        onClick={handleClick}
        whileHover={isUnlocked && !revealed ? { scale: 1.03 } : {}}
        whileTap={isUnlocked && !revealed ? { scale: 0.97 } : {}}
      >
        {isUnlocked ? (
          <>
            <span className="text-3xl mb-2">{card.emoji}</span>
            <span className="text-gold font-display text-sm font-semibold mb-3">
              Day {card.id}
            </span>
            {loading ? (
              <div className="flex items-center gap-2 text-wine/50">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-rose-soft border-t-rose-deep rounded-full"
                />
                <span className="text-sm font-body">Generating...</span>
              </div>
            ) : revealed && aiMessage ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-charcoal font-body text-sm leading-relaxed px-2"
              >
                {aiMessage}
              </motion.p>
            ) : (
              <p className="text-wine/40 font-body text-sm">
                Tap to reveal your message
              </p>
            )}
          </>
        ) : (
          <>
            <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-gray-400 font-display text-sm">
              Day {card.id}
            </span>
            <span className="text-gray-400 font-body text-xs mt-1">
              Unlocks {formatDate(card.unlock_date)}
            </span>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
