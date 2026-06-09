import { frequencyToNote } from '@/utils/frequencyToNote'
import { Icon } from '@lifeforge/ui'
import clsx from 'clsx'

function StringNote({
  frequency,
  isChecked
}: {
  frequency: number
  isChecked: boolean
}) {
  const noteName = frequencyToNote(frequency)

  const playNote = () => {
    const audioContext = new AudioContext()

    // Create multiple oscillators for a richer, sharper sound
    const oscillator1 = audioContext.createOscillator()

    const oscillator2 = audioContext.createOscillator()

    const oscillator3 = audioContext.createOscillator()

    const gainNode = audioContext.createGain()

    // Connect all oscillators to the gain node
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    oscillator3.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Set frequencies - fundamental + harmonics for guitar-like sound
    oscillator1.frequency.value = frequency
    oscillator2.frequency.value = frequency * 2 // First harmonic (octave)
    oscillator3.frequency.value = frequency * 3 // Second harmonic

    // Use triangle wave for sharper attack
    oscillator1.type = 'triangle'
    oscillator2.type = 'triangle'
    oscillator3.type = 'sine'

    // Sharper attack with quick fade
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.005) // Faster attack
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1.2 // Shorter decay
    )

    oscillator1.start(audioContext.currentTime)
    oscillator2.start(audioContext.currentTime)
    oscillator3.start(audioContext.currentTime)
    oscillator1.stop(audioContext.currentTime + 1.2)
    oscillator2.stop(audioContext.currentTime + 1.2)
    oscillator3.stop(audioContext.currentTime + 1.2)

    // Cleanup
    oscillator1.onended = () => {
      audioContext.close()
    }
  }

  return (
    <button
      className={clsx(
        'flex-center relative size-12 rounded-lg border-2 px-4 text-lg font-medium tracking-wider md:size-16 md:text-2xl',
        isChecked
          ? 'border-green-500 text-green-500'
          : 'component-bg-lighter-with-hover border-bg-500'
      )}
      onClick={playNote}
    >
      {noteName}
      {isChecked && (
        <Icon
          className="component-bg absolute -right-2 -top-2 size-6 rounded-full border-2 border-green-500 stroke-green-500 stroke-[2px] p-1 text-green-500"
          icon="uil:check"
        />
      )}
    </button>
  )
}

export default StringNote
