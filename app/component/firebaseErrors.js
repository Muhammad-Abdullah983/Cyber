// Helper function to convert Firebase error codes to user-friendly messages
export function getFirebaseErrorMessage(errorCode) {
    const errorMessages = {
        // Auth errors
        "auth/email-already-in-use": "This email is already registered. Please login instead.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/operation-not-allowed": "Email/password accounts are not enabled. Please contact support.",
        "auth/weak-password": "Password is too weak. Please use at least 6 characters.",
        "auth/user-disabled": "This account has been disabled. Please contact support.",
        "auth/user-not-found": "No account found with this email. Please sign up first.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-credential": "Invalid email or password. Please check your credentials.",
        "auth/too-many-requests": "Too many failed attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Please check your internet connection.",
        "auth/popup-closed-by-user": "Sign-in popup was closed before completing.",
        "auth/cancelled-popup-request": "Only one popup request is allowed at a time.",
        "auth/missing-password": "Please enter a password.",

        // OAuth errors
        "auth/account-exists-with-different-credential": "An account already exists with the same email but different sign-in credentials.",
        "auth/auth-domain-config-required": "Authentication configuration error. Please contact support.",
        "auth/credential-already-in-use": "This credential is already associated with a different account.",
        "auth/popup-blocked": "Sign-in popup was blocked by your browser. Please allow popups for this site.",
        "auth/unauthorized-domain": "This domain is not authorized for OAuth operations.",

        // Password reset errors
        "auth/expired-action-code": "This password reset link has expired. Please request a new one.",
        "auth/invalid-action-code": "This password reset link is invalid. Please request a new one.",

        // Email verification errors
        "auth/invalid-verification-code": "The verification code is invalid.",
        "auth/invalid-verification-id": "The verification ID is invalid.",
    };

    return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
}
