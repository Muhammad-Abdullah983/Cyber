"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "../../component/firebaseErrors";
import { getAuthInstance } from "@/Lib/firebase";
import { useAuth } from "@/app/component/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { user, login } = useAuth();

    const STORAGE_KEY = "recent_emails";
    const [recentEmails, setRecentEmails] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const containerRef = useRef(null);

    const authAvailable = Boolean(getAuthInstance());

    // Redirect if logged in
    useEffect(() => {
        if (user) router.push("/");
    }, [user, router]);

    // Fade-in animation
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Load recent emails
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const list = raw ? JSON.parse(raw) : [];
            setRecentEmails(Array.isArray(list) ? list : []);
        } catch {
            setRecentEmails([]);
        }
    }, []);

    // Close suggestions on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleRemoveRecent = (target) => {
        const updated = recentEmails.filter((x) => x !== target);
        setRecentEmails(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);

            const raw = localStorage.getItem(STORAGE_KEY);
            const list = raw ? JSON.parse(raw) : [];
            const filtered = (list || []).filter((x) => x !== email);
            filtered.unshift(email);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 5)));

            router.push("/");
        } catch (err) {
            const message = err?.code
                ? getFirebaseErrorMessage(err.code)
                : err?.message || "Failed to login";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">

            {/* GLASSMORPHIC CARD */}
            <div
                className={`
                    w-full max-w-md 
                    bg-white/15 backdrop-blur-xl 
                    p-8 rounded-2xl shadow-2xl border border-white/20
                    transform transition-all duration-700 ease-out
                    text-white
                    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
            >
                {/* HEADINGS */}
                <h1 className="text-3xl font-bold text-center mb-1 tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-center text-sm text-gray-200 mb-6">
                    Sign in to continue to <span className="font-semibold text-white">Cyber</span>
                </p>

                {/* ERROR */}
                {error && (
                    <p className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm border border-red-400/40">
                        {error}
                    </p>
                )}

                {/* WARNING */}
                {!authAvailable && (
                    <p className="bg-yellow-400/20 text-yellow-200 p-2 rounded mb-4 text-sm border border-yellow-300/40">
                        Firebase not configured. Add your Firebase keys in `.env.local`.
                    </p>
                )}

                {/* FORM */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4" ref={containerRef}>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-1 relative">
                        <label className="text-sm font-medium text-gray-200">Email</label>

                        <input
                            type="email"
                            autoComplete="email"
                            className="border border-white/40 bg-white/10 rounded-lg px-3 py-2 text-white 
                                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                                       placeholder-white/70 transition"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setShowSuggestions(true); }}
                            onFocus={() => setShowSuggestions(true)}
                            required
                        />

                        {/* SUGGESTIONS */}
                        {showSuggestions && recentEmails.length > 0 && (
                            <ul className="absolute z-20 left-0 right-0 top-full bg-black text-white backdrop-blur-lg 
                                           border border-white/30 rounded-lg shadow-lg text-sm mt-2 max-h-40 overflow-auto">
                                {recentEmails
                                    .filter((x) => x.toLowerCase().includes(email.toLowerCase()))
                                    .map((x) => (
                                        <li
                                            key={x}
                                            className="flex items-center justify-between px-3 py-2 
                                                       hover:bg-white/20 cursor-pointer text-white"
                                            onClick={() => { setEmail(x); setShowSuggestions(false); }}
                                        >
                                            <span>{x}</span>
                                            <button
                                                type="button"
                                                className="text-white/70 hover:text-white"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveRecent(x);
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-200">Password</label>
                            <a href="/Auth/forgot-password" className="text-xs text-blue-300 hover:underline">
                                Forgot?
                            </a>
                        </div>

                        <input
                            type="password"
                            className="border border-white/40 bg-white/10 rounded-lg px-3 py-2 text-white
                                       focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/70"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading || !authAvailable}
                        className="mt-2 bg-blue-600/80 hover:bg-blue-700/90 text-white py-2 rounded-lg 
                                   transition disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>
                </form>

                {/* FOOTER */}
                <p className="text-center text-sm mt-4 text-gray-200">
                    Don't have an account?{" "}
                    <a href="/Auth/signup" className="text-blue-300 hover:underline">
                        Sign Up
                    </a>
                </p>

                <p className="text-center text-sm mt-2">
                    <a href="/" className="text-gray-300 hover:text-white">
                        ← Back to Home
                    </a>
                </p>
            </div>
        </div>
    );
}
