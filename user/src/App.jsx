import Home from "./pages/home.jsx";
import Property from "./pages/property.jsx";
import PropertyDetails from "./pages/propertyDetails.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/property"
          element={<Property />}
        />

        <Route
          path="/property-details/:id"
          element={<PropertyDetails />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;