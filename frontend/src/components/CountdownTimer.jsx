import { motion } from 'framer-motion'
import FlipDigit from './FlipDigit'

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <FlipDigit value={value} />
      <span className="text-[10px] min-[400px]:text-xs sm:text-sm font-body text-wine/70 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center pb-5 sm:pb-6">
      <span className="text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl font-bold text-gold animate-pulse-slow select-none">
        :
      </span>
    </div>
  )
}

function AsciiFlower({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'text-[3px] min-[400px]:text-[4px] sm:text-[5px]',
    md: 'text-[4px] min-[400px]:text-[5px] sm:text-[6px]',
    lg: 'text-[5px] min-[400px]:text-[6px] sm:text-[7px]',
  }
  return (
    <pre className={`text-rose-deep/50 ${sizeClasses[size]} leading-tight select-none font-mono ${className}`}>
{`            ..ooo.
         .888888888.
         88"P""T"T888 8o
     o8o 8.8"8 88o."8o 8o
    88 . o88o8 8 88."8 88P"o
   88 o8 88 oo.8 888 8 888 88
   88 88 88o888" 88"  o888 88
   88."8o."T88P.88". 88888 88
   888."888."88P".o8 8888 888
   "888o"8888oo8888 o888 o8P"
    "8888.""888P"P.888".88P
     "88888ooo  888P".o888
       ""8P"".oooooo8888P
  .oo888ooo.    8888888P8
o88888"888"88o.  "8888"".88
 8888" "88 88888.       88"
 "8888o.""o 88"88o.    o8"
  T888C.oo. "8."8"8   o8"
   88888888o "8 8 8  .8
    "8888C.o8o  8 8  8"
      "88888888 " 8 .8
        "8888888o  .8o="
            "888" 88"
                o8P`}
    </pre>
  )
}

export { AsciiFlower }

export default function CountdownTimer({ days, hours, minutes, seconds, isExpired }) {
  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center px-4"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 overflow-hidden">
          <AsciiFlower size="sm" />
          <AsciiFlower size="md" />
          <AsciiFlower size="sm" />
        </div>
        <h2 className="font-display text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl text-rose-deep mb-2">
          Happy Valentine's Day!
        </h2>
        <p className="text-wine/60 font-body text-base sm:text-lg">The wait is over...</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <AsciiFlower size="sm" />
        <span className="text-rose-deep/40 font-display text-sm">for you</span>
        <AsciiFlower size="sm" />
      </div>
      <div className="flex items-center justify-center gap-1 min-[400px]:gap-2 sm:gap-3 md:gap-4">
        <TimeUnit value={days} label="Days" />
        <Separator />
        <TimeUnit value={hours} label="Hours" />
        <Separator />
        <TimeUnit value={minutes} label="Min" />
        <Separator />
        <TimeUnit value={seconds} label="Sec" />
      </div>
    </motion.div>
  )
}
