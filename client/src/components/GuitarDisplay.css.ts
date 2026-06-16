import { style } from '@vanilla-extract/css'

export const customMarginTop = style({
  marginTop: '0',
  '@media': {
    '(min-width: 640px)': {
      marginTop: '4em'
    },
    '(min-width: 768px)': {
      marginTop: '6.5em'
    }
  }
})
