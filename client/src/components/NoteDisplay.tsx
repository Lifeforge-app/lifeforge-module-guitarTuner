import { Bordered, Flex, Text, surface } from '@lifeforge/ui'

import { useGuitarTunerContext } from '../contexts/GuitarTunerContext'

function NoteDisplay() {
  const { note, frequency, isListening } = useGuitarTunerContext()

  return (
    <Bordered
      align="center"
      as={Flex}
      bg={surface.default}
      borderColor="bg-700"
      borderWidth="2px"
      direction="column"
      gap="sm"
      left="50%"
      p="md"
      position="absolute"
      r="lg"
      style={{
        bottom: '3.5rem',
        transform: 'translateX(-50%)'
      }}
    >
      <Text as="span" size={{ base: '3xl', sm: '5xl' }} weight="medium">
        {note}
      </Text>
      <Text color="muted" size={{ base: 'lg', sm: '2xl' }}>
        {isListening
          ? frequency
            ? `${frequency.toFixed(2)} Hz`
            : 'Listening...'
          : '0.00 Hz'}
      </Text>
    </Bordered>
  )
}

export default NoteDisplay
