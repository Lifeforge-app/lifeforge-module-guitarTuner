import { useCallback } from 'react'

import { Button, Flex, Icon, useModalStore } from '@lifeforge/ui'

import { GUITAR_TUNINGS } from '@/constants/tuning'

import { useGuitarTunerContext } from '../contexts/GuitarTunerContext'
import SelectTuningModal from './SelectTuningModal'

function ActionButtons() {
  const { currentTuning, isListening, setCurrentTuning, startListening, stopListening } =
    useGuitarTunerContext()

  const { open } = useModalStore()

  const openSelectTuningModal = useCallback(() => {
    open(SelectTuningModal, {
      tuning: currentTuning,
      onSelectTuning: (newTuning: number[]) => {
        setCurrentTuning(newTuning)
      }
    })
  }, [open, currentTuning, setCurrentTuning])

  return (
    <Flex direction={{ base: 'column', sm: 'row' }} gap="md">
      <Button
        icon="f7:tuningfork"
        variant="plain"
        onClick={openSelectTuningModal}
      >
        {GUITAR_TUNINGS.map(t => t.items)
          .flat()
          .find(
            t => JSON.stringify(t.freq) === JSON.stringify(currentTuning)
          )?.name || 'Select Tuning'}
        <Icon icon="tabler:chevron-right" />
      </Button>
      <Button
        icon="tabler:microphone"
        onClick={isListening ? stopListening : startListening}
      >
        {isListening ? 'Stop Tuning' : 'Start Tuning'}
      </Button>
    </Flex>
  )
}

export default ActionButtons
