import { createContext } from 'react'
import { User } from 'firebase/auth'

import { UserMetadataType } from '../types'

export type ViewerContextType = {
  viewer: User | null
  viewerMetadata: UserMetadataType | null
  loadingViewer: boolean
}

export default createContext<ViewerContextType>({
  viewer: null,
  viewerMetadata: null,
  loadingViewer: false,
})
