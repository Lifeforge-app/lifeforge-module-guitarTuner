import { Box, Transition } from '@lifeforge/ui'

import NoteDisplay from './NoteDisplay'
import PitchIndicator from './PitchIndicator'
import { centerLine } from './TunerCenterLine.css'

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
