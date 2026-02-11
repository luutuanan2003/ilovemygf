import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AsciiFlower } from '../components/CountdownTimer'
import CardGallery from '../components/CardGallery'
import GenerateMessage from '../components/GenerateMessage'
import EasterEgg from '../components/EasterEgg'

export default function Cards() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative z-10 px-4 py-8 max-w-5xl mx-auto">
      <EasterEgg />

      {/* Decorative flowers top */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4 opacity-35">
        <AsciiFlower size="sm" className="hidden min-[400px]:block" />
        <AsciiFlower size="md" />
        <AsciiFlower size="sm" className="hidden min-[400px]:block" />
      </div>

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

      {/* Flower Divider */}
      <div className="flex items-center justify-center gap-2 mb-12 opacity-30">
        <div className="flex-1 h-px bg-rose-deep/40 max-w-20"></div>
        <AsciiFlower size="sm" />
        <div className="flex-1 h-px bg-rose-deep/40 max-w-20"></div>
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

      {/* Bottom flower garden */}
      <div className="flex items-center justify-center gap-1 sm:gap-4 opacity-25 flex-wrap mb-4">
        <AsciiFlower size="sm" />
        <AsciiFlower size="md" className="hidden sm:block" />
        <AsciiFlower size="sm" />
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-wine/30 font-body text-xs">
        Made with love, just for you
      </div>
    </div>
  )
}
