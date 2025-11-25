"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/component/AuthContext";
import ProtectedRoute from "@/app/component/ProtectedRoute";

export default function ProfilePage() {
    const { user, logout, updateProfileInfo, changePassword, deleteAccount } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const router = useRouter();

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await updateProfileInfo({ displayName });
            setMessage("Profile updated successfully!");
        } catch (err) {
            setError(err?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            setMessage("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (err) {
            if (err?.code === "auth/wrong-password") {
                setError("Current password is incorrect");
            } else {
                setError(err?.message || "Failed to change password");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await deleteAccount();
            router.push("/");
        } catch (err) {
            if (err?.code === "auth/requires-recent-login") {
                setError("For security, please log out and log back in before deleting your account");
            } else {
                setError(err?.message || "Failed to delete account");
            }
            setShowDeleteConfirm(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 text-black py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
                        <p className="text-gray-600 mb-6">Manage your profile and account preferences</p>

                        {error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
                                {message}
                            </div>
                        )}

                        {/* Account Information */}
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3">Account Information</h2>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Email:</span> {user?.email}</p>
                                <p><span className="font-medium">Account Created:</span> {user?.metadata?.creationTime}</p>
                                <p><span className="font-medium">Last Sign In:</span> {user?.metadata?.lastSignInTime}</p>
                                {user?.providerData && user.providerData.length > 0 && (
                                    <p><span className="font-medium">Sign-in Method:</span> {
                                        user.providerData[0].providerId === "password" ? "Email/Password" :
                                            user.providerData[0].providerId === "google.com" ? "Google" :
                                                user.providerData[0].providerId
                                    }</p>
                                )}
                            </div>
                        </div>

                        {/* Update Profile Form */}
                        <form onSubmit={handleUpdateProfile} className="mb-8 pb-8 border-b">
                            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="text-sm font-medium block mb-1">Display Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                                        placeholder="Enter your name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition disabled:opacity-50 w-fit"
                                >
                                    {loading ? "Updating..." : "Update Profile"}
                                </button>
                            </div>
                        </form>

                        {/* Change Password Form - Only show for email/password accounts */}
                        {user?.providerData && user.providerData[0]?.providerId === "password" && (
                            <form onSubmit={handleChangePassword} className="mb-8 pb-8 border-b">
                                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <label className="text-sm font-medium block mb-1">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                                            placeholder="Enter current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block mb-1">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                                            placeholder="Enter new password (min 6 characters)"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block mb-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                                            placeholder="Confirm new password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition disabled:opacity-50 w-fit"
                                    >
                                        {loading ? "Changing..." : "Change Password"}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Danger Zone */}
                        <div>
                            {!showDeleteConfirm ? (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete Account
                                </button>
                            ) : (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-sm text-red-800 mb-3">
                                        ⚠️ Are you sure you want to delete your account? This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={loading}
                                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                                        >
                                            {loading ? "Deleting..." : "Yes, Delete My Account"}
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
