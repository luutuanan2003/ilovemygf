import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import CardGallery from '../components/CardGallery'
import GenerateMessage from '../components/GenerateMessage'
import LoveMeter from '../components/LoveMeter'
import EasterEgg from '../components/EasterEgg'

export default function Cards() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative z-10 px-4 py-8 max-w-5xl mx-auto">
      <EasterEgg />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="text-wine/40 hover:text-wine font-body text-sm mb-4 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="font-display text-3xl sm:text-4xl text-wine font-bold mb-2">
          Your Love Cards
        </h1>
        <p className="font-body text-wine/50 text-sm sm:text-base">
          14 days of love - tap a card to reveal your message
        </p>
      </motion.div>

      {/* Card Gallery */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <CardGallery />
      </motion.section>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-rose-soft/30"></div>
        <span className="text-rose-soft text-2xl">&#x2665;</span>
        <div className="flex-1 h-px bg-rose-soft/30"></div>
      </div>

      {/* Generate New Message */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="font-display text-2xl text-wine text-center mb-6">
          Want Another Love Message?
        </h2>
        <GenerateMessage />
      </motion.section>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-rose-soft/30"></div>
        <span className="text-rose-soft text-2xl">&#x2665;</span>
        <div className="flex-1 h-px bg-rose-soft/30"></div>
      </div>

      {/* Love Meter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <LoveMeter />
      </motion.section>

      {/* Footer */}
      <div className="text-center py-8 text-wine/30 font-body text-xs">
        Made with love, just for you
      </div>
    </div>
  )
}
