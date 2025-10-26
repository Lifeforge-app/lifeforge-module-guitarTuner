import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { Button, ModuleHeader } from 'lifeforge-ui'
import { useEffect, useRef, useState } from 'react'

import StringNote from './components/StringNote'
import { useGuitarTuner } from './hooks/useGuitarTuner'
import { frequencyToNote } from './utils/frequencyToNote'

const GUITAR_STRINGS = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63]

const CENTS_TOLERANCE = 3

function GuitarTuner() {
  const {
    frequency,
    note,
    cents,
    isListening,
    error,
    startListening,
    stopListening
  } = useGuitarTuner()

  const [tunedNotes, setTunedNotes] = useState<Set<string>>(new Set())

  const tuningTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  // Track when a note is in tune for 0.5 seconds
  useEffect(() => {
    if (!isListening || !frequency) {
      // Clear all timers if not listening or no frequency
      tuningTimersRef.current.forEach(timer => clearTimeout(timer))
      tuningTimersRef.current.clear()

      return
    }

    const absCents = Math.abs(cents)

    const isInTune = absCents < CENTS_TOLERANCE

    if (isInTune && GUITAR_STRINGS.map(frequencyToNote).includes(note)) {
      // Start timer if not already started
      if (!tuningTimersRef.current.has(note)) {
        const timer = setTimeout(() => {
          setTunedNotes(prev => new Set(prev).add(note))
        }, 800)

        tuningTimersRef.current.set(note, timer)
      }
    } else {
      // Clear timer if note goes out of tune
      const timer = tuningTimersRef.current.get(note)

      if (timer) {
        clearTimeout(timer)
        tuningTimersRef.current.delete(note)
      }
    }
  }, [note, cents, frequency, isListening])

  // Cleanup timers on unmount or when stopping
  useEffect(() => {
    setTunedNotes(new Set())

    if (!isListening) {
      tuningTimersRef.current.forEach(timer => clearTimeout(timer))
      tuningTimersRef.current.clear()
    }
  }, [isListening])

  return (
    <>
      <ModuleHeader />
      <div className="flex-center mb-8 w-full flex-1 flex-col">
        <div className="before:bg-bg-700 relative top-8 w-full flex-1 transition-all before:absolute before:left-1/2 before:top-0 before:h-full before:w-0.5 before:-translate-x-1/2">
          <span className="text-bg-500 absolute left-[calc(50%-18rem)] top-16 -translate-x-1/2 text-3xl">
            ♭
          </span>
          <div
            className={clsx(
              'absolute top-12 size-16 -translate-x-1/2 before:absolute before:-bottom-[2px] before:left-1/2 before:z-[-1] before:size-4 before:-translate-x-1/2 before:rotate-45',
              (() => {
                if (!isListening || frequency === 0) {
                  return 'before:bg-bg-200'
                }

                const absCents = Math.abs(cents)

                if (absCents <= CENTS_TOLERANCE) {
                  return 'before:bg-green-700'
                } else if (absCents <= 15) {
                  return 'before:bg-yellow-700'
                } else {
                  return 'before:bg-red-700'
                }
              })()
            )}
            style={{
              left:
                Math.abs(cents) <= CENTS_TOLERANCE
                  ? '50%'
                  : `calc(50% + ${cents * 0.2}%)`
            }}
          >
            <div
              className={clsx(
                'border-bg-200 component-bg flex-center size-full rounded-full border-4 text-xl',
                (() => {
                  if (!isListening || frequency === 0) {
                    return 'border-bg-200 text-bg-300'
                  }

                  const absCents = Math.abs(cents)

                  if (absCents <= CENTS_TOLERANCE) {
                    return 'border-green-700 text-white'
                  } else if (absCents <= 15) {
                    return 'border-yellow-700 text-white'
                  } else {
                    return 'border-red-700 text-white'
                  }
                })()
              )}
            >
              {frequency === 0 ? (
                <></>
              ) : Math.abs(cents) <= CENTS_TOLERANCE &&
                GUITAR_STRINGS.map(frequencyToNote).includes(note) ? (
                <Icon className="size-8" icon="tabler:check" />
              ) : (
                <>
                  {cents < 0 ? '-' : cents > 0 ? '+' : ''}
                  {Math.abs(cents)}
                </>
              )}
            </div>
          </div>
          <span className="text-bg-500 absolute right-[calc(50%-18rem)] top-16 translate-x-1/2 text-3xl">
            ♯
          </span>
          <div className="border-bg-700 flex-center component-bg absolute bottom-14 left-1/2 -translate-x-1/2 flex-col gap-3 rounded-lg border-2 p-4">
            <span className="text-5xl">{note}</span>
            <span className="text-bg-500 text-2xl">
              {isListening
                ? frequency
                  ? `${frequency.toFixed(2)} Hz`
                  : 'Listening...'
                : '0.00 Hz'}
            </span>
          </div>
        </div>
        <div className="flex-center relative mb-12 w-full">
          <div className="-mt-16 space-y-12">
            <StringNote frequency={146.83} isChecked={tunedNotes.has('D3')} />
            <StringNote frequency={110.0} isChecked={tunedNotes.has('A2')} />
            <StringNote frequency={82.41} isChecked={tunedNotes.has('E2')} />
          </div>
          <Icon
            className="text-bg-500 w-128 h-auto"
            icon="qlementine-icons:guitar-24"
          />
          <div className="-mt-16 space-y-12">
            <StringNote frequency={196.0} isChecked={tunedNotes.has('G3')} />
            <StringNote frequency={246.94} isChecked={tunedNotes.has('B3')} />
            <StringNote frequency={329.63} isChecked={tunedNotes.has('E4')} />
          </div>
        </div>
        <Button
          icon="tabler:microphone"
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? 'Stop Tuning' : 'Start Tuning'}
        </Button>
        {error && <div className="text-red-500">Error: {error}</div>}
      </div>
    </>
  )
}

export default GuitarTuner
