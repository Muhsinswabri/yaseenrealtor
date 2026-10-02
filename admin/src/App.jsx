import AdminLogin from "./pages/adminLogin.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import AddProperty from "./pages/addProperty.jsx";
import EditProperty from "./pages/editProperty.jsx";
import AdminProtectedRoute from "./components/adminProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/admin/login" replace />}
      />

      <Route
        path="/admin"
        element={<Navigate to="/admin/login" replace />}
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/add-property"
          element={<AddProperty />}
        />

        <Route
          path="/admin/edit-property/:id"
          element={<EditProperty />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/admin/login" replace />}
      />
    </Routes>
  );
}

export default App;