// Firebase initializer (client-side). Exports `auth`, `googleProvider`, and helper `getAuthInstance()`.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Build config from environment variables. If these are not present the
// initializer will not attempt to initialize Firebase (prevents errors
// like auth/invalid-api-key during server-side or misconfigured runs).
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

let app = null;
let auth = null;
let googleProvider = null;

function initFirebaseClient() {
    // Only initialize on the client and when we have a valid apiKey
    if (typeof window === "undefined") return null;
    if (!firebaseConfig.apiKey) {
        // Do not throw here — caller should handle absence of auth gracefully.
        // Log to help debugging in dev.
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn("Firebase API key is missing. Firebase auth will be disabled.");
        }
        return null;
    }

    if (!app) {
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApp();
        }
    }

    if (!auth) auth = getAuth(app);
    if (!googleProvider) googleProvider = new GoogleAuthProvider();

    return { app, auth, googleProvider };
}

export function getAuthInstance() {
    if (auth) return auth;
    const res = initFirebaseClient();
    return res ? res.auth : null;
}

export function getFirebaseApp() {
    if (app) return app;
    const res = initFirebaseClient();
    return res ? res.app : null;
}

export function getGoogleProvider() {
    if (googleProvider) return googleProvider;
    const res = initFirebaseClient();
    return res ? res.googleProvider : null;
}

export default {
    initFirebaseClient,
};