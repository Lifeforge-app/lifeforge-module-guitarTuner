import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Guitar Tuner',
  icon: 'mingcute:guitar-line',
  routes: {
    '/': lazy(() => import('@'))
  },
  category: 'Utilities'
} satisfies ModuleConfig
