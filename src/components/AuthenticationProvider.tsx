import { useCallback, useEffect, useMemo, useState } from 'react'
import { User, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import ViewerContext, { ViewerContextType } from '../contexts/ViewerContext'
import { authentication, db, persistancePromise } from '../firebase'

import { UserMetadataType } from '../types'

function AuthenticationProvider({ children }: any) {
  const [viewer, setViewer] = useState<User | null>(null)
  const [viewerMetadata, setViewerMetadata] = useState<UserMetadataType | null>(null)
  const [loadingViewer, setViewerLoading] = useState(true)
  const viewerContextValue = useMemo<ViewerContextType>(() => ({ viewer, viewerMetadata, loadingViewer }), [viewer, viewerMetadata, loadingViewer])

  const handleAuthenticationStateChange = useCallback(async () => {
    await persistancePromise

    onAuthStateChanged(authentication, async (viewer: User | null) => {
      if (viewer && !viewer.isAnonymous) {
        const result = await getDoc(doc(db, 'users', viewer.uid))

        setViewerMetadata(result.data() as UserMetadataType)
        setViewer(viewer)
        setViewerLoading(false)
      }
      else if (viewer && viewer.isAnonymous) {
        const metadata: UserMetadataType = {
          id: viewer.uid,
          anonymous: true,
          name: 'Anonymous',
          avatar: 'pink',
          currentWorkspaceId: null,
          workspaceIdToPosition: {},
          lastPing: -1,
          createdAt: new Date().toISOString(),
        }

        await setDoc(doc(db, 'users', viewer.uid), metadata)
        setViewerMetadata(metadata)
        setViewer(viewer)
        setViewerLoading(false)
      }
      else {
        signInAnonymously(authentication)
      }
    })
  }, [])

  useEffect(() => {
    handleAuthenticationStateChange()
  }, [handleAuthenticationStateChange])

  return (
    <ViewerContext.Provider value={viewerContextValue}>
      {children}
    </ViewerContext.Provider>
  )
}

export default AuthenticationProvider
