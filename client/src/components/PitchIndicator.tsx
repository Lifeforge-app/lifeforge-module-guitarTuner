import { Bordered, Box, Flex, Icon, Text } from '@lifeforge/ui'

import { frequencyToNote } from '@/utils/frequencyToNote'

import { indicatorArrow } from './PitchIndicator.css'
import { useGuitarTunerContext } from '../contexts/GuitarTunerContext'
import AccidentalLabel from './AccidentalLabel'

function PitchIndicator() {
  const { cents, toneColor, currentTuning, note, frequency, absCents } =
    useGuitarTunerContext()

  return (
    <>
      <AccidentalLabel side="left">♭</AccidentalLabel>
      <Box
        className={indicatorArrow}
        height="4rem"
        left={Math.abs(cents) <= 3 ? '50%' : `calc(50% + ${cents * 0.2}%)`}
        position="absolute"
        style={{
          transform: 'translateX(-50%)'
        }}
        top="3rem"
        width="4rem"
      >
        <Text asChild color={toneColor ? 'bg-50' : 'muted'}>
          <Bordered
            align="center"
            as={Flex}
            borderColor={(() => {
              if (!toneColor) return { base: 'bg-200', dark: 'bg-200' }
              if (toneColor === 'green') return 'green-700'
              if (toneColor === 'yellow') return 'yellow-700'

              return 'red-700'
            })()}
            borderWidth="4px"
            height="100%"
            justify="center"
            r="full"
            width="100%"
          >
            {frequency === 0 ? (
              <></>
            ) : absCents <= 3 &&
              currentTuning.map(frequencyToNote).includes(note) ? (
              <Icon icon="tabler:check" size="2rem" />
            ) : (
              <Text size={{ base: 'lg', sm: 'xl' }}>
                {cents < 0 ? '-' : cents > 0 ? '+' : ''}
                {absCents}
              </Text>
            )}
          </Bordered>
        </Text>
      </Box>
      <AccidentalLabel side="right">♯</AccidentalLabel>
    </>
  )
}

export default PitchIndicator
