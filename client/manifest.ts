import { lazy } from 'react'

import { createForgeModuleClient } from '@lifeforge/federation'

const { forgeAPI, ...manifest } = createForgeModuleClient({
  routes: {
    '/': lazy(() => import('@'))
  }
})

export default manifest

export { forgeAPI }
