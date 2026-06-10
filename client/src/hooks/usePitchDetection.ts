import { PitchDetector } from 'pitchy'
import { useRef, useState } from 'react'

interface UsePitchDetectionOptions {
  bufferSize?: number
  clarityThreshold?: number
  minFrequency?: number
}

export function usePitchDetection(options: UsePitchDetectionOptions = {}) {
  const { bufferSize = 2, clarityThreshold = 0.85, minFrequency = 60 } = options

  const [frequency, setFrequency] = useState<number>(0)
  const pitchDetectorRef = useRef<PitchDetector<Float32Array> | null>(null)
  const frequencyBufferRef = useRef<number[]>([])
  const animationFrameRef = useRef<number | null>(null)

  const initializeDetector = (fftSize: number) => {
    pitchDetectorRef.current = PitchDetector.forFloat32Array(fftSize)
  }

  const detectPitch = (
    analyser: AnalyserNode,
    dataArray: Float32Array,
    sampleRate: number
  ) => {
    if (!pitchDetectorRef.current) return

    // Get time domain data for pitch detection
    analyser.getFloatTimeDomainData(dataArray as any)

    // Detect pitch using pitchy library
    const [pitch, clarity] = pitchDetectorRef.current.findPitch(
      dataArray,
      sampleRate
    )

    // Check if we have a clear pitch and it's above minimum frequency
    if (clarity > clarityThreshold && pitch > minFrequency) {
      // Minimal smoothing - average last N values
      frequencyBufferRef.current.push(pitch)

      if (frequencyBufferRef.current.length > bufferSize) {
        frequencyBufferRef.current.shift()
      }

      // Simple average of recent values
      const avgFreq =
        frequencyBufferRef.current.reduce((sum, f) => sum + f, 0) /
        frequencyBufferRef.current.length

      const roundedFreq = Math.round(avgFreq * 10) / 10

      setFrequency(roundedFreq)
    } else {
      // Clear buffer if signal is too weak or unclear
      if (frequencyBufferRef.current.length > 0) {
        frequencyBufferRef.current = []
        setFrequency(0)
      }
    }
  }

  const startDetection = (
    analyser: AnalyserNode,
    dataArray: Float32Array,
    sampleRate: number
  ) => {
    const updateFrequency = () => {
      if (!analyser || !dataArray || !pitchDetectorRef.current) {
        return
      }

      detectPitch(analyser, dataArray, sampleRate)
      animationFrameRef.current = requestAnimationFrame(updateFrequency)
    }

    updateFrequency()
  }

  const stopDetection = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    frequencyBufferRef.current = []
    setFrequency(0)
  }

  return {
    frequency,
    initializeDetector,
    startDetection,
    stopDetection
  }
}
