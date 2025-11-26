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
    const [mounted, setMounted] = useState(false);

    const router = useRouter();
    const { user, signup, logout } = useAuth();

    const authAvailable = Boolean(getAuthInstance());

    // Fade-in page animation
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Redirect if user already logged in
    useEffect(() => {
        if (user && !loading) router.push("/");
    }, [user, loading, router]);

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
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            await signup(email, password);

            // Immediately logout so user must login manually
            try {
                await logout();
            } catch {}

            router.push("/Auth/login");
        } catch (err) {
            const msg = err?.code
                ? getFirebaseErrorMessage(err.code)
                : err?.message || "Something went wrong. Try again.";

            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">

            {/* GLASSMORPHIC SIGNUP CARD */}
            <div
                className={`
                    w-full max-w-md 
                    bg-white/15 backdrop-blur-xl 
                    p-8 rounded-2xl shadow-2xl border border-white/20
                    transform transition-all duration-700 ease-out
                    text-white
                    ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
                `}
            >
                <h1 className="text-3xl font-extrabold text-center mb-1">Create Account</h1>
                <p className="text-center text-sm text-gray-200 mb-6">
                    Join <span className="font-semibold text-white">Cyber</span> — personalized carts & wishlists await
                </p>

                {error && (
                    <p className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm border border-red-400/40">
                        {error}
                    </p>
                )}

                {!authAvailable && (
                    <p className="bg-yellow-500/20 text-yellow-200 p-2 rounded mb-4 text-sm border border-yellow-300/40">
                        Firebase is not configured. Add keys to <code>.env.local</code>.
                    </p>
                )}

                {/* FORM */}
                <form onSubmit={handleSignup} className="flex flex-col gap-4">

                    {/* EMAIL */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-200">Email</label>
                        <input
                            type="email"
                            className="border border-white/40 bg-white/10 rounded-lg px-3 py-2 text-white
                                       focus:outline-none focus:ring-2 focus:ring-blue-400
                                       placeholder-white/60 transition"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-200">Password</label>
                        <input
                            type="password"
                            className="border border-white/40 bg-white/10 rounded-lg px-3 py-2 text-white
                                       focus:outline-none focus:ring-2 focus:ring-blue-400
                                       placeholder-white/60 transition"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-200">Confirm Password</label>
                        <input
                            type="password"
                            className="border border-white/40 bg-white/10 rounded-lg px-3 py-2 text-white
                                       focus:outline-none focus:ring-2 focus:ring-blue-400
                                       placeholder-white/60 transition"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading || !authAvailable}
                        className="mt-2 bg-blue-600/80 hover:bg-blue-700/90 text-white py-2 rounded-lg
                                   transition transform hover:scale-[1.03] disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-200">
                    Already have an account?{" "}
                    <a href="/Auth/login" className="text-blue-300 hover:underline">
                        Login
                    </a>
                </p>

                <p className="text-center text-sm mt-2">
                    <a href="/" className="text-gray-400 hover:text-white">
                        ← Back to Home
                    </a>
                </p>
            </div>
        </div>
    );
}
