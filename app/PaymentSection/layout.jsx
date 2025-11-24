import ProtectedRoute from "../component/ProtectedRoute";

export default function PaymentLayout({ children }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}