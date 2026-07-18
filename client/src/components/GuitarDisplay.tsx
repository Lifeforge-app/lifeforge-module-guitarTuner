import { Flex, Icon } from '@lifeforge/ui'

import { frequencyToNote } from '@/utils/frequencyToNote'

import { useGuitarTunerContext } from '../contexts/GuitarTunerContext'
import { customMarginTop } from './GuitarDisplay.css'
import StringNote from './StringNote'

function GuitarDisplay() {
  const { currentTuning, tunedNotes } = useGuitarTunerContext()

  return (
    <Flex
      gap={{ base: 'md', sm: 'none' }}
      justify="center"
      mb={{ base: 'lg', sm: '2xl' }}
      position="relative"
      px="2xl"
      width="100%"
    >
      <Flex
        className={customMarginTop}
        direction="column"
        gapY={{ base: 'xl', md: '2xl' }}
      >
        {currentTuning
          .slice(0, 3)
          .reverse()
          .map(freq => (
            <StringNote
              key={freq}
              frequency={freq}
              isChecked={tunedNotes.has(frequencyToNote(freq))}
            />
          ))}
      </Flex>
      <Icon
        color="muted"
        display="block"
        icon="qlementine-icons:guitar-24"
        size={{ base: '80%', sm: '24rem', md: '32rem' }}
      />
      <Flex
        className={customMarginTop}
        direction="column"
        gapY={{ base: 'xl', md: '2xl' }}
      >
        {currentTuning.slice(3, 6).map(freq => (
          <StringNote
            key={freq}
            frequency={freq}
            isChecked={tunedNotes.has(frequencyToNote(freq))}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default GuitarDisplay
