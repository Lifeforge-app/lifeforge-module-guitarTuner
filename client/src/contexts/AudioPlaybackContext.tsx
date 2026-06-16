import { createContext, useCallback, useContext, useRef } from 'react'

interface AudioPlaybackContextValue {
  playNote: (frequency: number) => void
}

const AudioPlaybackContext = createContext<AudioPlaybackContextValue | null>(
  null
)

export function AudioPlaybackProvider({
  children
}: {
  children: React.ReactNode
}) {
  const audioContextRef = useRef<AudioContext | null>(null)

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }

    return audioContextRef.current
  }, [])

  const playNote = useCallback(
    (frequency: number) => {
      const audioContext = getAudioContext()

      const oscillator1 = audioContext.createOscillator()
      const oscillator2 = audioContext.createOscillator()
      const oscillator3 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator1.connect(gainNode)
      oscillator2.connect(gainNode)
      oscillator3.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator1.frequency.value = frequency
      oscillator2.frequency.value = frequency * 2
      oscillator3.frequency.value = frequency * 3

      oscillator1.type = 'triangle'
      oscillator2.type = 'triangle'
      oscillator3.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(
        0.4,
        audioContext.currentTime + 0.005
      )
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1.2
      )

      oscillator1.start(audioContext.currentTime)
      oscillator2.start(audioContext.currentTime)
      oscillator3.start(audioContext.currentTime)
      oscillator1.stop(audioContext.currentTime + 1.2)
      oscillator2.stop(audioContext.currentTime + 1.2)
      oscillator3.stop(audioContext.currentTime + 1.2)
    },
    [getAudioContext]
  )

  return (
    <AudioPlaybackContext.Provider value={{ playNote }}>
      {children}
    </AudioPlaybackContext.Provider>
  )
}

export function useAudioPlayback(): AudioPlaybackContextValue {
  const ctx = useContext(AudioPlaybackContext)

  if (!ctx) {
    throw new Error(
      'useAudioPlayback must be used within an AudioPlaybackProvider'
    )
  }

  return ctx
}
