"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { getAuthInstance } from "@/Lib/firebase";
import { getFirebaseErrorMessage } from "@/app/component/firebaseErrors";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const clientAuth = getAuthInstance();
            if (!clientAuth) throw new Error("Auth not initialized");

            await sendPasswordResetEmail(clientAuth, email);
            setMessage("Password reset email sent! Please check your inbox.");
            setEmail(""); // Clear the form
        } catch (err) {
            const errorMessage = getFirebaseErrorMessage(err.code);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Enter your email and we'll send you a link to reset your password
                </p>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm">
                        {message}
                    </p>
                )}

                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div className="flex items-center justify-between mt-6 text-sm">
                    <button
                        onClick={() => router.push("/Auth/login")}
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        ← Back to Login
                    </button>
                    <a href="/Auth/signup" className="text-blue-600 underline hover:text-blue-800">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
}
