import { style } from '@vanilla-extract/css'

export const centerLine = style({
  '::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: '50%',
    height: '100%',
    width: '0.125rem',
    backgroundColor: 'var(--color-bg-700)',
    transform: 'translateX(-50%)'
  }
})
