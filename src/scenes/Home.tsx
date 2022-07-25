import { useNavigate } from 'react-router-dom'
import { Flex, Spinner } from 'honorable'
import { useContext, useEffect } from 'react'

import ViewerContext from '../contexts/ViewerContext'

function Home() {
  const navigate = useNavigate()
  const { viewer, loadingViewer } = useContext(ViewerContext)

  useEffect(() => {
    if (loadingViewer) return

    navigate(viewer ? viewer.isAnonymous ? '/sign-up' : '/workspaces' : '/sign-up', { replace: true })
  }, [loadingViewer, navigate, viewer])

  return (
    <Flex
      center
      flexGrow={1}
    >
      <Spinner size={64} />
    </Flex>
  )
}

export default Home
