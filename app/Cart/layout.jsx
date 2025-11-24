import ProtectedRoute from "../component/ProtectedRoute";

export default function CartLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
