import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Flex, Form, Icon, Input, P, Spinner } from 'honorable'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'

import { authentication, db, googleProvider } from '../firebase'
import GoogleIcon from '../icons/GoogleIcon'
import EmailIcon from '../icons/EmailIcon'
import EyeOpenIcon from '../icons/EyeOpenIcon'
import EyeClosedIcon from '../icons/EyeClosedIcon'
import PersonIcon from '../icons/PersonIcon'

import { UserMetadataType } from '../types'

const redirectionLocalStorageKey = 'is-provider-redirect'

function Authentication({ isSignUp }: any) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loadingProvider, setLoadingProvider] = useState(true)
  const [loadingEmail, setLoadingEmail] = useState(false)

  const inOrUp = isSignUp ? 'up' : 'in'

  useEffect(() => {
    if (localStorage.getItem(redirectionLocalStorageKey) === '1') {
      setLoadingProvider(true)

      localStorage.removeItem(redirectionLocalStorageKey)
    }
    else {
      setLoadingProvider(false)
    }
  }, [])

  useEffect(() => {
    getRedirectResult(authentication)
    .then(result => {
      if (!result) {
        setLoadingProvider(false)

        return
      }

      const userMetadata: Partial<UserMetadataType> = {
        id: result.user.uid,
        name: result.user.displayName || 'A user',
        email: result.user.email,
        imageUrl: result.user.photoURL,
        anonymous: false,
      }

      setDoc(
        doc(db, 'users', result.user.uid),
        userMetadata,
        {
          merge: true,
        }
      )
      .then(() => {
        navigate('/workspaces')
      })
    })
  }, [navigate])

  function handleGoogleClick() {
    localStorage.setItem(redirectionLocalStorageKey, '1')

    signInWithRedirect(authentication, googleProvider)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (isSignUp && !name) return setError('Please enter a name.')
    if (!email) return setError('Please enter an email.')
    if (!password) return setError('Please enter a password.')

    setLoadingEmail(true)

    ;(
      isSignUp
        ? createUserWithEmailAndPassword(authentication, email, password)
        : signInWithEmailAndPassword(authentication, email, password)
    )
    .then(viewer => {
      if (isSignUp) {
        const user: Partial<UserMetadataType> = {
          id: viewer.user.uid,
          name,
          email,
        }

        return setDoc(doc(db, 'users', viewer.user.uid), user)
      }
    })
    .then(() => {
      navigate('/workspaces')
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email': {
          setError('The email you entered is invalid.')
          break
        }
        case 'auth/wrong-password': {
          setError('The password you entered is incorrect.')
          break
        }
        default: {
          setError(`An error occured: ${error.code || error.message}.`)
          break
        }
      }

      setLoadingEmail(false)
    })
  }

  if (loadingProvider) {
    return (
      <Flex
        center
        flexGrow={1}
      >
        <Spinner size={64} />
      </Flex>
    )
  }

  return (
    <Flex
      direction="column"
      flexGrow={1}
      align="center"
      justify="center"
      mb={6}
    >
      <Flex
        direction="column"
        width={512 + 96}
      >
        <Flex
          align="center"
          gap={1}
          justify="space-between"
        >
          <P
            fontSize={32}
            fontWeight="bold"
          >
            Welcome, teammate.
          </P>
          <Button
            type="button"
            secondary
            large
            flexGrow={0}
            border="none"
            as={Link}
            to={isSignUp ? '/sign-in' : '/sign-up'}
          >
            {isSignUp ? 'Sign in' : 'New here? Sign up'}
          </Button>
        </Flex>
        <Button
          large
          startIcon={(
            <GoogleIcon width={24} />
          )}
          secondary
          mt={2}
          onClick={handleGoogleClick}
        >
          Sign {inOrUp} with Google
        </Button>
        <P
          mt={2}
          textAlign="center"
        >
          - Or use your email to sign {inOrUp} -
        </P>
        <Form onSubmit={handleSubmit}>
          {isSignUp && (
            <Input
              large
              name="name"
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
              startIcon={(
                <PersonIcon />
              )}
              placeholder="Name"
              width="100%"
              mt={2}
            />
          )}
          <Input
            large
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            startIcon={(
              <EmailIcon />
            )}
            placeholder="Work email"
            width="100%"
            mt={isSignUp ? 1 : 2}
          />
          <Input
            large
            name="password"
            autoComplete="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            startIcon={(
              <Icon
                cursor="pointer"
                onClick={() => setIsPasswordVisible(x => !x)}
              >
                {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </Icon>
            )}
            placeholder="Password"
            width="100%"
            mt={1}
          />
          <Button
            large
            loading={loadingEmail}
            flexGrow={8}
            type="submit"
            width="100%"
            mt={1}
          >
            Sign {inOrUp}
          </Button>
        </Form>
        <P
          color="red"
          mt={1}
        >
          {error || <>&nbsp;</>}
        </P>
      </Flex>
    </Flex>
  )
}

export default Authentication
