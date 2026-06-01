import { Icon } from '@iconify/react'
import clsx from 'clsx'

import { ModalHeader } from '@lifeforge/ui'

import { GUITAR_TUNINGS } from '@/constants/tuning'
import { frequencyToNote } from '@/utils/frequencyToNote'

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
    <div className="min-w-[40vw]">
      <ModalHeader
        icon="f7:tuningfork"
        title="Select Tuning"
        onClose={onClose}
      />
      {GUITAR_TUNINGS.map(category => (
        <div key={category.category} className="mb-8">
          <h2 className="mb-4 pb-1 text-lg font-semibold">
            {category.category}
          </h2>
          <div className="flex flex-col gap-3">
            {category.items.map(tuningOption => (
              <button
                key={tuningOption.name}
                className={clsx(
                  'component-bg-lighter-with-hover flex-between relative w-full flex-col gap-4 rounded-lg p-4 px-5 sm:flex-row',
                  JSON.stringify(tuningOption.freq) === JSON.stringify(tuning)
                    ? 'outline-custom-500 outline outline-2'
                    : ''
                )}
                onClick={() => {
                  onSelectTuning(tuningOption.freq)
                  onClose()
                }}
              >
                <span className="w-full text-left">{tuningOption.name}</span>
                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-1 sm:flex-nowrap">
                    {tuningOption.freq.map(freq => (
                      <div
                        key={freq}
                        className="flex-center bg-bg-700/50 size-9 rounded-md text-sm"
                      >
                        {frequencyToNote(freq)}
                      </div>
                    ))}
                  </div>
                  {JSON.stringify(tuningOption.freq) ===
                  JSON.stringify(tuning) ? (
                    <Icon
                      className="text-custom-500 absolute top-2 right-2 size-6 sm:static"
                      icon="uil:check-circle"
                    />
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SelectTuningModal
