import {
  Bordered,
  Box,
  Flex,
  Icon,
  Text,
  colorWithOpacity,
  surface
} from '@lifeforge/ui'

import { useAudioPlayback } from '@/contexts/AudioPlaybackContext'
import { frequencyToNote } from '@/utils/frequencyToNote'

function StringNote({
  frequency,
  isChecked
}: {
  frequency: number
  isChecked: boolean
}) {
  const noteName = frequencyToNote(frequency)

  const { playNote } = useAudioPlayback()

  return (
    <Bordered
      asChild
      borderColor={isChecked ? 'green-500' : { base: 'bg-500', dark: 'bg-500' }}
      borderWidth="2px"
    >
      <Flex
        align="center"
        as="button"
        bg={
          isChecked
            ? colorWithOpacity('green-500', '10%')
            : surface.lightInteractive
        }
        height="3em"
        justify="center"
        position="relative"
        r="lg"
        width="3em"
        onClick={() => playNote(frequency)}
      >
        <Text
          as="code"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          weight="medium"
        >
          {noteName}
        </Text>
        {isChecked && (
          <Box
            bg={surface.default}
            height="1.5rem"
            position="absolute"
            r="full"
            right="-0.5rem"
            style={{
              border: '2px solid #22c55e',
              stroke: '#22c55e',
              strokeWidth: 2
            }}
            top="-0.5rem"
            width="1.5rem"
          >
            <Icon color="green-500" icon="uil:check" size="1em" />
          </Box>
        )}
      </Flex>
    </Bordered>
  )
}

export default StringNote
