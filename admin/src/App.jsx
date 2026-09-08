import AdminLogin from "./pages/adminLogin.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import AddProperty from "./pages/addProperty.jsx";
import EditProperty from "./pages/editProperty.jsx";
import AdminProtectedRoute from "./components/adminProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;