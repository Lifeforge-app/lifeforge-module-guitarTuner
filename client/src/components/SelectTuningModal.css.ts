import { style } from '@vanilla-extract/css'

export const categoryTitle = style({
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '3px',
      backgroundColor: 'var(--color-custom-500)',
      borderRadius: '9999px'
    }
  },
  position: 'relative',
  paddingLeft: '0.75rem'
})
