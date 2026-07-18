import {
  Box,
  Flex,
  Icon,
  ModalHeader,
  Ring,
  Stack,
  Text,
  colorWithOpacity,
  surface
} from '@lifeforge/ui'

import { GUITAR_TUNINGS } from '@/constants/tuning'
import { frequencyToNote } from '@/utils/frequencyToNote'

import { categoryTitle } from './SelectTuningModal.css'

function SelectTuningModal({
  onClose,
  data: { tuning, onSelectTuning }
}: {
  onClose: () => void
  data: {
    tuning: number[]
    onSelectTuning: (newTuning: number[]) => void
  }
}) {
  return (
    <Box minWidth="40vw">
      <ModalHeader
        icon="f7:tuningfork"
        title="Select Tuning"
        onClose={onClose}
      />
      <Stack gap="2xl">
        {GUITAR_TUNINGS.map(category => (
          <Box key={category.category} mb="xl">
            <Text
              as="h2"
              className={categoryTitle}
              mb="md"
              pb="xs"
              size="lg"
              weight="semibold"
            >
              {category.category}
            </Text>
            <Stack gap="sm">
              {category.items.map(tuningOption => {
                const isSelected =
                  JSON.stringify(tuningOption.freq) === JSON.stringify(tuning)

                return (
                  <Ring
                    key={tuningOption.name}
                    asChild
                    ringColor="custom-500"
                    ringWidth={isSelected ? '2px' : '0px'}
                  >
                    <Flex
                      align="center"
                      as="button"
                      bg={surface.lightInteractive}
                      direction={{ base: 'column', sm: 'row' }}
                      gap="md"
                      justify="between"
                      p="md"
                      position="relative"
                      px="lg"
                      r="lg"
                      width="100%"
                      onClick={() => {
                        onSelectTuning(tuningOption.freq)
                        onClose()
                      }}
                    >
                      <Text>{tuningOption.name}</Text>
                      <Flex align="center" gap="md">
                        <Flex gap="xs" wrap={{ base: 'wrap', sm: 'nowrap' }}>
                          {tuningOption.freq.map(freq => (
                            <Flex
                              key={freq}
                              align="center"
                              bg={colorWithOpacity('bg-700', '50%')}
                              height="2.25rem"
                              justify="center"
                              r="md"
                              width="2.25rem"
                            >
                              <Text size="sm">{frequencyToNote(freq)}</Text>
                            </Flex>
                          ))}
                        </Flex>
                        {isSelected && (
                          <Icon
                            color="custom-500"
                            icon="uil:check-circle"
                            position={{ base: 'absolute', sm: 'static' }}
                            size="1.5rem"
                            style={{
                              top: '0.5rem',
                              right: '0.5rem'
                            }}
                          />
                        )}
                      </Flex>
                    </Flex>
                  </Ring>
                )
              })}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default SelectTuningModal
