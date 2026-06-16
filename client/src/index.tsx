import { Flex, ModuleHeader } from '@lifeforge/ui'

import ActionButtons from './components/ActionButtons'
import GuitarDisplay from './components/GuitarDisplay'
import TunerCenterLine from './components/TunerCenterLine'
import { AudioPlaybackProvider } from './contexts/AudioPlaybackContext'
import { GuitarTunerProvider } from './contexts/GuitarTunerContext'

function GuitarTuner() {
  return (
    <GuitarTunerProvider>
      <AudioPlaybackProvider>
        <ModuleHeader />
        <Flex centered direction="column" flex="1" mb="xl">
          <TunerCenterLine />
          <GuitarDisplay />
          <ActionButtons />
        </Flex>
      </AudioPlaybackProvider>
    </GuitarTunerProvider>
  )
}

export default GuitarTuner
