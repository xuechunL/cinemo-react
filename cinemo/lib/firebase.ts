// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import {
	browserSessionPersistence,
	getAuth,
	GoogleAuthProvider,
	NextOrObserver,
	onAuthStateChanged,
	setPersistence,
	signOut,
	User,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase on client side
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
// Initialize Firebase Firestore
const db = getFirestore(app)

// Only initialize analytics on the client side
// const analytics = window !== undefined ? getAnalytics(app) : null

// Auth persistence (optional)
// https://firebase.google.com/docs/auth/web/auth-state-persistence
setPersistence(auth, browserSessionPersistence)

const signOutUser = async () => await signOut(auth)

// FIXME: failed to create user document
// Error accessing Firestore: FirebaseError: Missing or insufficient permissions.
export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, 'users', userAuth.uid)
	console.log('userDocRef', userDocRef)
	console.log('userAuth', userAuth)

	try {
		const userSnapshot = await getDoc(userDocRef)

		if (!userSnapshot.exists()) {
			const { displayName, email, metadata } = userAuth

			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt: metadata.creationTime,
				lastSignInAt: metadata.lastSignInTime,
				...additionalInformation,
			})
		}

		return userDocRef
	} catch (error) {
		// TODO: handle the error appropriately
		console.error('Error accessing Firestore:', error)
		return null
	}
}

const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback)

export { auth, googleProvider, db, signOutUser, onAuthStateChangedListener }
