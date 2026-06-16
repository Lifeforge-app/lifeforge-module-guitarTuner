import { style } from '@vanilla-extract/css'

export const indicatorArrow = style({
  '::before': {
    content: '',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    zIndex: -1,
    width: '1rem',
    height: '1rem',
    transform: 'translateX(-50%) rotate(45deg)'
  }
})
