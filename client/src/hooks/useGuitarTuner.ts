import { useEffect, useState } from 'react'

import { toast } from '@lifeforge/ui'

import { frequencyToNote, getCentsDeviation } from '../utils/frequencyToNote'
import { requestMicrophoneAccess } from '../utils/microphone'
import { useAudioContext } from './useAudioContext'
import { usePitchDetection } from './usePitchDetection'

export function useGuitarTuner() {
  const [isListening, setIsListening] = useState<boolean>(false)

  const {
    audioContextRef,
    analyserRef,
    dataArrayRef,
    initializeAudioContext,
    cleanup: cleanupAudio
  } = useAudioContext()

  const { frequency, initializeDetector, startDetection, stopDetection } =
    usePitchDetection({
      bufferSize: 2,
      clarityThreshold: 0.85
    })

  const startListening = async () => {
    try {
      // Stop any existing listening session first
      if (isListening) {
        stopListening()
        // Add a small delay to ensure cleanup is complete
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      // Request microphone access
      const stream = await requestMicrophoneAccess()

      // Initialize audio context and nodes
      await initializeAudioContext(stream)

      if (!analyserRef.current || !audioContextRef.current) {
        throw new Error('Failed to initialize audio context')
      }

      // Initialize pitch detector
      initializeDetector(analyserRef.current.fftSize)

      // Start pitch detection
      startDetection(
        analyserRef.current,
        dataArrayRef.current!,
        audioContextRef.current.sampleRate
      )

      setIsListening(true)
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Failed to access microphone. Please check permissions.'
      )
      console.error('Error accessing microphone:', err)
    }
  }

  const stopListening = () => {
    stopDetection()
    cleanupAudio()
    setIsListening(false)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening()
    }
  }, [])

  const note = frequency ? frequencyToNote(frequency) : '--'

  const cents = frequency ? getCentsDeviation(frequency) : 0

  return {
    frequency,
    note,
    cents,
    isListening,
    startListening,
    stopListening
  }
}
