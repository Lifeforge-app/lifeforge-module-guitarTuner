import { Box, Text } from '@lifeforge/ui'

function AccidentalLabel({
  side,
  children
}: {
  side: 'left' | 'right'
  children: string
}) {
  return (
    <Box
      asChild
      position="absolute"
      top="4rem"
      {...(side === 'left'
        ? { left: 'calc(50% - 18rem)' }
        : { right: 'calc(50% - 18rem)' })}
    >
      <Text
        color="muted"
        size="3xl"
        style={{
          transform: `translateX(${side === 'left' ? '-50%' : '50%'})`
        }}
      >
        {children}
      </Text>
    </Box>
  )
}

export default AccidentalLabel
