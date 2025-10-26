/**
 * Convert frequency (Hz) to musical note name
 * @param frequency - Frequency in Hz
 * @returns Note name with octave (e.g., "A4", "C#3")
 */
export function frequencyToNote(frequency: number): string {
  if (!frequency || frequency <= 0) {
    return '--'
  }

  const noteNames = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
  ]

  // Calculate semitones from A4 (440 Hz)
  const A4 = 440

  const semitonesFromA4 = 12 * Math.log2(frequency / A4)

  // Round to nearest semitone
  const semitone = Math.round(semitonesFromA4)

  // Calculate note index (A is at index 9)
  const noteIndex = (9 + semitone) % 12

  const adjustedIndex = noteIndex >= 0 ? noteIndex : noteIndex + 12

  // Calculate octave (A4 is octave 4)
  const octave = Math.floor((9 + semitone) / 12) + 4

  return `${noteNames[adjustedIndex]}${octave}`
}

/**
 * Get the cents deviation from the nearest note
 * @param frequency - Frequency in Hz
 * @returns Cents deviation (positive = sharp, negative = flat)
 */
export function getCentsDeviation(frequency: number): number {
  if (!frequency || frequency <= 0) {
    return 0
  }

  const A4 = 440

  const semitonesFromA4 = 12 * Math.log2(frequency / A4)

  const semitone = Math.round(semitonesFromA4)

  // Cents deviation from the nearest note
  const cents = (semitonesFromA4 - semitone) * 100

  return Math.round(cents)
}
