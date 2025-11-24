"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "@/app/component/firebaseErrors";
import { useAuth } from "@/app/component/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, login, loginWithGoogle } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            router.push("/"); // redirect to home after login
        } catch (err) {
            const errorMessage = err && err.code ? getFirebaseErrorMessage(err.code) : err?.message || "Failed to login";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);

        try {
            await loginWithGoogle();
            router.push("/"); // redirect to home after login
        } catch (err) {
            const errorMessage = err?.message || "Failed to sign in with Google";
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
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                        {error}
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
                            <a href="/Auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                                Forgot password?
                            </a>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Login In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <a href="/Auth/signup" className="text-blue-600 underline hover:text-blue-800">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
