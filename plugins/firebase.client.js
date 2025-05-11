import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBohyKmBc9_FwD2Lf6yoaXl2fJqFf-Vnog",
  authDomain: "nuxt-spotify.firebaseapp.com",
  projectId: "nuxt-spotify",
  storageBucket: "nuxt-spotify.firebasestorage.app",
  messagingSenderId: "246188056910",
  appId: "1:246188056910:web:653811b3057ab5c4173e1f"
}

const app = initializeApp(firebaseConfig)

export default defineNuxtPlugin(() => {
  const auth = getAuth(app)
  const db = getFirestore(app)

  return {
    provide: {
      firebase: app,
      auth,
      db
    }
  }
})
