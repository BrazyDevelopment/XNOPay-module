"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface TimerProps {
  timeLeft: number
}

export function Timer({ timeLeft }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  // Calculate percentage of time left
  const percentage = (timeLeft / (5 * 60 * 1000)) * 100

  // Determine color based on time left
  const getColor = () => {
    if (percentage > 50) return "text-primary"
    if (percentage > 20) return "text-orange-500"
    return "text-red-400"
  }

  return (
    <motion.div
      className="flex items-center space-x-2 bg-base-300 px-3 py-1.5 rounded-full border border-neutral-content/10"
      animate={{
        scale: timeLeft <= 30000 ? [1, 1.05, 1] : 1,
        borderColor:
          timeLeft <= 30000
            ? ["rgba(255,255,255,0.1)", "rgba(239,68,68,0.5)", "rgba(255,255,255,0.1)"]
            : "rgba(255,255,255,0.1)",
      }}
      transition={{
        repeat: timeLeft <= 30000 ? Number.POSITIVE_INFINITY : 0,
        duration: 2.0,
      }}
    >
      <Clock size={14} className={getColor()} />
      {timeLeft > 0 ? (
        <span className={`text-sm font-medium ${getColor()}`}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      ) : (
        <span className="text-sm font-medium text-red-500">Expired</span>
      )}
    </motion.div>
  )
}
