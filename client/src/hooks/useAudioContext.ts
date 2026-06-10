import { useRef } from 'react'

export function useAudioContext() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Float32Array | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const initializeAudioContext = async (stream: MediaStream) => {
    // Create new AudioContext
    audioContextRef.current = new AudioContext()

    // Force the AudioContext to start if it's suspended
    if (audioContextRef.current.state !== 'running') {
      // Create a silent audio source to "kick-start" the context
      const oscillator = audioContextRef.current.createOscillator()

      const gainNode = audioContextRef.current.createGain()

      gainNode.gain.value = 0
      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)
      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + 0.001)

      await audioContextRef.current.resume()
    }

    // Wait a bit for the context to be ready
    await new Promise(resolve => setTimeout(resolve, 100))

    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)

    // Create a gain node to amplify the signal
    gainNodeRef.current = audioContextRef.current.createGain()
    gainNodeRef.current.gain.value = 5.0 // Amplify by 5x

    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 4096
    analyserRef.current.smoothingTimeConstant = 0

    dataArrayRef.current = new Float32Array(analyserRef.current.fftSize)

    // Connect: source -> gain -> analyser
    sourceRef.current.connect(gainNodeRef.current)
    gainNodeRef.current.connect(analyserRef.current)

    streamRef.current = stream
  }

  const cleanup = () => {
    if (sourceRef.current) {
      sourceRef.current.disconnect()
      sourceRef.current = null
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
    }

    // Stop all tracks in the media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    analyserRef.current = null
    dataArrayRef.current = null
  }

  return {
    audioContextRef,
    analyserRef,
    dataArrayRef,
    initializeAudioContext,
    cleanup
  }
}
