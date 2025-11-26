"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    updateProfile as fbUpdateProfile,
    updatePassword as fbUpdatePassword,
    deleteUser as fbDeleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { getAuthInstance, getGoogleProvider } from "@/Lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuthInstance();
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u || null);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const signup = async (email, password) => {
        const auth = getAuthInstance();
        if (!auth) throw new Error("Auth not initialized");
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result;
    };

    const login = async (email, password) => {
        const auth = getAuthInstance();
        if (!auth) throw new Error("Auth not initialized");
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    };

    const loginWithGoogle = async () => {
        const auth = getAuthInstance();
        const provider = getGoogleProvider();
        if (!auth || !provider) throw new Error("Auth or Google provider not initialized");
        const result = await signInWithPopup(auth, provider);
        return result;
    };

    const sendResetEmail = async (email) => {
        const auth = getAuthInstance();
        if (!auth) throw new Error("Auth not initialized");
        return sendPasswordResetEmail(auth, email);
    };

    const updateProfileInfo = async (updates) => {
        const auth = getAuthInstance();
        if (!auth || !auth.currentUser) throw new Error("Not authenticated");
        await fbUpdateProfile(auth.currentUser, updates);
        // refresh local user
        setUser({ ...auth.currentUser });
        return true;
    };

    const changePassword = async (currentPassword, newPassword) => {
        const auth = getAuthInstance();
        if (!auth || !auth.currentUser) throw new Error("Not authenticated");
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await fbUpdatePassword(auth.currentUser, newPassword);
        return true;
    };

    const deleteAccount = async () => {
        const auth = getAuthInstance();
        if (!auth || !auth.currentUser) throw new Error("Not authenticated");
        await fbDeleteUser(auth.currentUser);
        setUser(null);
        return true;
    };

    const logout = async () => {
        const auth = getAuthInstance();
        if (!auth) return;
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signup,
                login,
                loginWithGoogle,
                sendResetEmail,
                updateProfileInfo,
                changePassword,
                deleteAccount,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
