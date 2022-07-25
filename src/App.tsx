import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from 'honorable'

import theme from './theme'

import Layout from './components/Layout'
import AuthenticationProvider from './components/AuthenticationProvider'

const Home = lazy(() => import('./scenes/Home'))
const Authentication = lazy(() => import('./scenes/Authentication'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthenticationProvider>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={(
                  <Layout>
                    <Home />
                  </Layout>
                )}
              />
              <Route
                path="sign-in"
                element={(
                  <Layout noUserNavigation>
                    <Authentication />
                  </Layout>
                )}
              />
              <Route
                path="sign-up"
                element={(
                  <Layout noUserNavigation>
                    <Authentication isSignUp />
                  </Layout>
                )}
              />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </AuthenticationProvider>
    </ThemeProvider>
  )
}

export default App
