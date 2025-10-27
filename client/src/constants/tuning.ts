export interface GuitarTuning {
  name: string
  freq: number[]
}

export interface TuningCategory {
  category: string
  items: GuitarTuning[]
}

export const GUITAR_TUNINGS: TuningCategory[] = [
  {
    category: 'Standard Tuning',
    items: [
      {
        name: 'Standard',
        freq: [82.41, 110.0, 146.83, 196.0, 246.94, 329.63] // E2, A2, D3, G3, B3, E4
      }
    ]
  },
  {
    category: 'Drop (Power) Tunings',
    items: [
      {
        name: 'Drop D',
        freq: [73.42, 110.0, 146.83, 196.0, 246.94, 329.63] // D2, A2, D3, G3, B3, E4
      },
      {
        name: 'Double Drop D',
        freq: [73.42, 110.0, 146.83, 196.0, 246.94, 293.66] // D2, A2, D3, G3, B3, D4
      },
      {
        name: 'D modal',
        freq: [73.42, 110.0, 146.83, 196.0, 220.0, 293.66] // D2, A2, D3, G3, A3, D4
      },
      {
        name: 'Double Daddy',
        freq: [73.42, 110.0, 146.83, 146.83, 220.0, 293.66] // D2, A2, D3, D3, A3, D4
      },
      {
        name: 'Drop C#',
        freq: [69.3, 103.83, 138.59, 185.0, 233.08, 277.18] // C#2, G#2, C#3, F#3, A#3, D#4
      },
      {
        name: 'Drop C',
        freq: [65.41, 98.0, 130.81, 174.61, 220.0, 293.66] // C2, G2, C3, F3, A3, D4
      },
      {
        name: 'Drop B',
        freq: [61.74, 92.5, 123.47, 164.81, 207.65, 277.18] // B1, F#2, B2, E3, G#3, C#4
      },
      {
        name: 'Drop A',
        freq: [55.0, 82.41, 110.0, 146.83, 185.0, 246.94] // A1, E2, A2, D3, F#3, B3
      }
    ]
  },
  {
    category: 'Open Tunings',
    items: [
      {
        name: 'Open C',
        freq: [65.41, 98.0, 130.81, 196.0, 130.81, 329.63] // C2, G2, C3, G3, C4, E4
      },
      {
        name: 'Open E',
        freq: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63] // E2, B2, E3, G#3, B3, E4
      },
      {
        name: 'Open F',
        freq: [65.41, 87.31, 130.81, 174.61, 220.0, 349.23] // C2, F2, C3, F3, A3, F4
      },
      {
        name: 'Open G',
        freq: [73.42, 98.0, 146.83, 196.0, 246.94, 293.66] // D2, G2, D3, G3, B3, D4
      },
      {
        name: 'Open A',
        freq: [82.41, 110.0, 138.59, 164.81, 220.0, 329.63] // E2, A2, C#3, E3, A3, E4
      },
      {
        name: 'Open A 2',
        freq: [82.41, 110.0, 164.81, 220.0, 138.59, 329.63] // E2, A2, E3, A3, C#4, E4
      },
      {
        name: 'Open Am',
        freq: [82.41, 110.0, 164.81, 220.0, 130.81, 329.63] // E2, A2, E3, A3, C4, E4
      },
      {
        name: 'Open Em',
        freq: [82.41, 123.47, 164.81, 196.0, 246.94, 329.63] // E2, B2, E3, G3, B3, E4
      },
      {
        name: 'Open D',
        freq: [73.42, 110.0, 146.83, 185.0, 220.0, 293.66] // D2, A2, D3, F#3, A3, D4
      },
      {
        name: 'Open Dm',
        freq: [73.42, 110.0, 146.83, 174.61, 220.0, 293.66] // D2, A2, D3, F3, A3, D4
      }
    ]
  },
  {
    category: 'Extra Tunings',
    items: [
      {
        name: '-1; Eb; "Half step down"',
        freq: [77.78, 103.83, 138.59, 185.0, 233.08, 311.13] // D#2, G#2, C#3, F#3, A#3, D#4
      },
      {
        name: '-2; "Whole step down"',
        freq: [73.42, 98.0, 130.81, 174.61, 220.0, 293.66] // D2, G2, C3, F3, A3, D4
      },
      {
        name: '+1',
        freq: [87.31, 116.54, 155.56, 207.65, 261.63, 349.23] // F2, A#2, D#3, G#3, C4, F4
      },
      {
        name: '+2',
        freq: [92.5, 123.47, 164.81, 220.0, 138.59, 369.99] // F#2, B2, E3, A3, C#4, F#4
      },
      {
        name: 'G modal',
        freq: [73.42, 98.0, 146.83, 196.0, 130.81, 293.66] // D2, G2, D3, G3, C4, D4
      },
      {
        name: 'All 4th',
        freq: [82.41, 110.0, 146.83, 196.0, 130.81, 349.23] // E2, A2, D3, G3, C4, F4
      },
      {
        name: 'NST',
        freq: [65.41, 98.0, 146.83, 220.0, 329.63, 196.0] // C2, G2, D3, A3, E4, G4
      }
    ]
  }
]
