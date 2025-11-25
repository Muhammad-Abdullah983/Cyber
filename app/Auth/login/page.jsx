"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "../../component/firebaseErrors";
import { getAuthInstance } from "@/Lib/firebase";
import { useAuth } from "@/app/component/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, login } = useAuth();

    // Check whether Firebase auth is available; if not, show a friendly message
    const authAvailable = Boolean(getAuthInstance());

    // Redirect if already logged in
    useEffect(() => {
        if (user) router.push('/');
    }, [user, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            router.push('/');
        } catch (err) {
            const errorMessage = err && err.code ? getFirebaseErrorMessage(err.code) : err?.message || "Failed to login";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>
                )}

                {!authAvailable && (
                    <p className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4 text-sm">
                        Firebase is not configured. Authentication is disabled until you add Firebase config to `.env.local`.
                    </p>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Password</label>
                            <a href="/Auth/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading || !authAvailable} className="mt-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-50">
                        {loading ? "Signing In..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">Don't have an account? <a href="/Auth/signup" className="text-blue-600 underline hover:text-blue-800">Sign Up</a></p>
                <p className="text-center text-sm mt-2"><a href="/" className="text-gray-600 hover:text-gray-800">← Back to Home</a></p>
            </div>
        </div>
    );
}
