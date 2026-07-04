import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { useGuitarTuner } from '../hooks/useGuitarTuner'
import { frequencyToNote } from '../utils/frequencyToNote'

export const CENTS_TOLERANCE = 6

interface GuitarTunerContextValue {
  frequency: number | null
  note: string
  cents: number
  isListening: boolean
  tunedNotes: Set<string>
  currentTuning: number[]
  absCents: number
  toneColor: string | null
  setCurrentTuning: (tuning: number[]) => void
  startListening: () => Promise<void>
  stopListening: () => void
}

const GuitarTunerContext = createContext<GuitarTunerContextValue | null>(null)

export function GuitarTunerProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { frequency, note, cents, isListening, startListening, stopListening } =
    useGuitarTuner()

  const [tunedNotes, setTunedNotes] = useState<Set<string>>(new Set())

  const [currentTuning, setCurrentTuning] = useState<number[]>([
    82.41, 110.0, 146.83, 196.0, 246.94, 329.63
  ])

  const tuningTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  useEffect(() => {
    if (!isListening || !frequency) {
      tuningTimersRef.current.forEach(timer => clearTimeout(timer))
      tuningTimersRef.current.clear()

      return
    }

    const absCents = Math.abs(cents)
    const isInTune = absCents < CENTS_TOLERANCE

    if (isInTune && currentTuning.map(frequencyToNote).includes(note)) {
      if (!tuningTimersRef.current.has(note)) {
        const timer = setTimeout(() => {
          setTunedNotes(prev => new Set(prev).add(note))
        }, 800)
        tuningTimersRef.current.set(note, timer)
      }
    } else {
      const timer = tuningTimersRef.current.get(note)

      if (timer) {
        clearTimeout(timer)
        tuningTimersRef.current.delete(note)
      }
    }
  }, [note, cents, frequency, isListening, currentTuning])

  useEffect(() => {
    setTunedNotes(new Set())

    if (!isListening) {
      tuningTimersRef.current.forEach(timer => clearTimeout(timer))
      tuningTimersRef.current.clear()
    }
  }, [isListening])

  useEffect(() => {
    stopListening()
  }, [currentTuning])

  const absCents = Math.abs(cents)

  const toneColor =
    !isListening || frequency === 0
      ? null
      : absCents <= CENTS_TOLERANCE
        ? 'green'
        : absCents <= 15
          ? 'yellow'
          : 'red'

  return (
    <GuitarTunerContext.Provider
      value={{
        frequency,
        note,
        cents,
        isListening,
        tunedNotes,
        currentTuning,
        absCents,
        toneColor,
        setCurrentTuning,
        startListening,
        stopListening
      }}
    >
      {children}
    </GuitarTunerContext.Provider>
  )
}

export function useGuitarTunerContext() {
  const ctx = useContext(GuitarTunerContext)

  if (!ctx) {
    throw new Error(
      'useGuitarTunerContext must be used within GuitarTunerProvider'
    )
  }

  return ctx
}
