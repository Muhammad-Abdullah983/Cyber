"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "../../component/firebaseErrors";
import { useAuth } from "@/app/component/AuthContext";
import { getAuthInstance } from "@/Lib/firebase";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, signup, logout } = useAuth();

    // determine whether Firebase auth is initialized (client + env configured)
    const authAvailable = Boolean(getAuthInstance());

    useEffect(() => {
        if (user) router.push('/');
    }, [user, router]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            await signup(email, password);
            // Ensure the user is not automatically signed in after signup.
            // Call logout to clear any session and redirect to the login page.
            try {
                await logout();
            } catch (e) {
                // ignore logout errors
            }
            router.push('/Auth/login');
        } catch (err) {
            const errorMessage = err && err.code ? getFirebaseErrorMessage(err.code) : err?.message || "An unexpected error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>
                )}

                {!authAvailable && (
                    <p className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4 text-sm">
                        Firebase is not configured. Signup is disabled until you add Firebase config to `.env.local` and restart the dev server.
                    </p>
                )}

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading || !authAvailable} className="mt-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-50">
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">Already have an account? <a href="/Auth/login" className="text-blue-600 underline hover:text-blue-800">Login</a></p>
                <p className="text-center text-sm mt-2"><a href="/" className="text-gray-600 hover:text-gray-800">← Back to Home</a></p>
            </div>
        </div>
    );
}