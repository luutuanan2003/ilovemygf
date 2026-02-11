import { motion } from 'framer-motion'
import useAudioPlayer from '../hooks/useAudioPlayer'

export default function MusicToggle() {
  const { isPlaying, toggle } = useAudioPlayer('/audio/beabadoobee - Glue Song (Official Music Video).mp3')

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-rose-soft/30 flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-5 h-5 text-rose-deep" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 4h2v16H9V4zm4 0h2v16h-2V4z"/>
          </svg>
        </motion.div>
      ) : (
        <svg className="w-5 h-5 text-rose-deep ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      )}
    </motion.button>
  )
}
