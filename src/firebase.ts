import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { GoogleAuthProvider, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
// import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'

const firebaseConfig = {
}

const app = initializeApp(firebaseConfig)

// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(''),
//   isTokenAutoRefreshEnabled: true,
// })

export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)
export const functions = getFunctions(app)
export const authentication = getAuth(app)
export const persistancePromise = setPersistence(authentication, browserLocalPersistence)
export const googleProvider = new GoogleAuthProvider()

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001)
}
