import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Guitar Tuner',
  icon: 'mingcute:guitar-line',
  routes: {
    'guitar-tuner': lazy(() => import('@'))
  },
  category: 'Utilities'
} satisfies ModuleConfig
