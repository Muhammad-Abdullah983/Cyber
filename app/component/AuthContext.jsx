"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Simple mock user used to keep the app behaving as "signed in".
const MOCK_USER = {
    uid: "mock-uid",
    email: "demo@example.com",
    displayName: "Demo User",
    metadata: {
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
    },
    providerData: [{ providerId: "password" }],
};

export const AuthProvider = ({ children, provideMock = true }) => {
    const [user, setUser] = useState(provideMock ? MOCK_USER : null);
    const [loading, setLoading] = useState(false);

    // Mocked auth methods: return Promises so pages can await them.
    const signup = async (email, password) => {
        // Simulate network latency
        await new Promise((r) => setTimeout(r, 250));
        setUser({ ...MOCK_USER, email, displayName: "New User" });
        return { user: { email } };
    };

    const login = async (email, password) => {
        await new Promise((r) => setTimeout(r, 250));
        setUser({ ...MOCK_USER, email, displayName: "Signed In" });
        return { user: { email } };
    };

    const loginWithGoogle = async () => {
        await new Promise((r) => setTimeout(r, 250));
        setUser({ ...MOCK_USER, displayName: "Google User" });
        return { user: MOCK_USER };
    };

    const sendResetEmail = async (email) => {
        await new Promise((r) => setTimeout(r, 200));
        return true;
    };

    const updateProfileInfo = async (updates) => {
        setUser((u) => ({ ...u, ...updates }));
        return true;
    };

    const changePassword = async (currentPassword, newPassword) => {
        await new Promise((r) => setTimeout(r, 200));
        return true;
    };

    const deleteAccount = async () => {
        await new Promise((r) => setTimeout(r, 200));
        setUser(null);
        return true;
    };

    const logout = async () => {
        setUser(null);
        return true;
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
