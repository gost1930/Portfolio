import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { buttonStyles } from '../../lib/button-styles'
import type { ButtonSize, ButtonVariant } from '../../lib/button-styles'

/** Motion props are shared so buttons and links feel identical under the cursor. */
const press = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.975, y: 0 },
  transition: { type: 'spring' as const, stiffness: 420, damping: 26 },
}

/* Framer's motion components own these DOM handler names — drop the native ones. */
type NativeButton = Omit<
  ComponentPropsWithoutRef<'button'>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

export interface ButtonProps extends NativeButton {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      {...press}
      className={buttonStyles(variant, size, className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}

type NativeAnchor = Omit<
  ComponentPropsWithoutRef<'a'>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

export interface ButtonLinkProps extends NativeAnchor {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <motion.a
      {...press}
      className={buttonStyles(variant, size, className)}
      {...props}
    >
      {children}
    </motion.a>
  )
}
