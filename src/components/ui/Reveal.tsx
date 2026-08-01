import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface RevealProps {
  children: ReactNode
  /** Seconds. Stagger siblings by passing an increasing delay. */
  delay?: number
  /** Travel distance in px. Keep it small — motion should be felt, not watched. */
  y?: number
  className?: string
}

/**
 * Scroll-triggered fade-in-up. Fires once, slightly before the element is
 * fully in view so content is already settled by the time you read it.
 */
export function Reveal({ children, delay = 0, y = 14, className }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
