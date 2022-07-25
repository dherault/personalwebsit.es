import { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Div, Flex, Menu, MenuItem, P, useOutsideClick } from 'honorable'
import { signOut } from 'firebase/auth'

import { authentication } from '../firebase'

import ViewerContext from '../contexts/ViewerContext'
import ExitIcon from '../icons/ExitIcon'

function Layout({ children, floatingNavigation = false, noUserNavigation = false }: any) {
  const { viewer } = useContext(ViewerContext)

  const navProps = !floatingNavigation ? {} : {
    py: 1,
    px: 2,
    align: 'center',
    flexShrink: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  }

  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      maxWidth="100vw"
      maxHeight="100vh"
      overflowY="scroll"
      overflowX="hidden"
    >
      <Flex
        py={1}
        px={2}
        align="center"
        flexShrink={0}
        minHeight={72}
        {...navProps}
      >
        <P
          fontSize={24}
          fontWeight="bold"
          as={Link}
          to={viewer && !viewer.isAnonymous ? '/workspaces' : '/sign-in'}
          color="text"
          textDecoration="none"
          _hover={{ textDecoration: 'underline' }}
        >
          Where Space
        </P>
        <Div flexGrow={1} />
        {!noUserNavigation && (
          <UserMenu />
        )}
      </Flex>
      {children}
    </Flex>
  )
}

function UserMenu() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { viewer, viewerMetadata, loadingViewer } = useContext(ViewerContext)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function handleToggleMenu() {
    setOpen(x => !x)
  }

  async function handleSignoutClick() {
    await signOut(authentication)

    navigate('/sign-in')
  }

  useOutsideClick(rootRef, () => setOpen(false))

  if (loadingViewer) return null

  if (!viewer || viewer.isAnonymous) {
    return (
      <Flex gap={1}>
        {viewer?.isAnonymous && (
          <AnonymousUserMenu />
        )}
        <Button
          as={Link}
          to="/sign-up"
        >
          Sign up
        </Button>
        <Button
          secondary
          as={Link}
          to="/sign-in"
        >
          Sign in
        </Button>
      </Flex>
    )
  }

  return (
    <Flex
      ref={rootRef}
      center
      position="relative"
    >
      <Flex
        center
        _hover={{ backgroundColor: 'background-light' }}
        p={0.5}
        m={-0.5}
        borderRadius="50%"
        cursor="pointer"
        onClick={handleToggleMenu}
      >
        <Avatar
          src={viewer.photoURL as string}
          name={viewerMetadata?.name || viewer.displayName as string}
          backgroundColor="primary"
        />
      </Flex>
      <Menu
        open={open}
        position="absolute"
        top="calc(100% + 8px)"
        right={0}
        width={256 - 64}
        zIndex={999}
      >
        <MenuItem
          color="red"
          onClick={handleSignoutClick}
        >
          <ExitIcon />
          <P ml={0.5}>
            Sign out
          </P>
        </MenuItem>
      </Menu>
    </Flex>
  )
}

function AnonymousUserMenu() {
  return (
    <Flex
      align="center"
      position="relative"
    >
      <P>Guest</P>
    </Flex>
  )
}

export default Layout
