import { Box, Transition } from '@lifeforge/ui'

import { centerLine } from './TunerCenterLine.css'
import NoteDisplay from './NoteDisplay'
import PitchIndicator from './PitchIndicator'

function TunerCenterLine() {
  return (
    <Transition>
      <Box
        className={centerLine}
        flex="1"
        position="relative"
        top="0"
        width="100%"
      >
        <PitchIndicator />
        <NoteDisplay />
      </Box>
    </Transition>
  )
}

export default TunerCenterLine
