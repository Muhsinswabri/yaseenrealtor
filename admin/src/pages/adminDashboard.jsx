import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/properties`
      );

      const data = await response.json();

      setProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete property");
        return;
      }

      setProperties((prevProperties) =>
        prevProperties.filter(
          (property) => property._id !== id
        )
      );
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Unable to connect to server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">

      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Title */}
            <div>
              <p className="text-xs sm:text-sm tracking-widest text-yellow-700 uppercase">
                Yaseen Realtor
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                Admin Dashboard
              </h1>
            </div>

            {/* Header Buttons */}
            <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">

              <button
                onClick={() =>
                  navigate("/admin/add-property")
                }
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                + Add Property
              </button>

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* Main */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Summary Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">

          <p className="text-sm text-gray-500">
            Total Properties
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-1">
            {properties.length}
          </h2>

        </div>

        {/* Properties Section */}
        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Properties
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage your listed properties.
            </p>

          </div>

          {/* Loading */}
          {loading ? (
            <div className="bg-white rounded-xl p-10 text-center">
              <p className="text-gray-500">
                Loading properties...
              </p>
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center">
              <p className="text-gray-500">
                No properties available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

              {properties.map((property) => (
                <div
                  key={property._id}
                  className="w-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                >

                  {/* Image */}
                  <img
                    src={property.images?.[0] || ""}
                    alt={property.name}
                    className="w-full h-52 sm:h-60 object-cover"
                  />

                  {/* Content */}
                  <div className="p-4 sm:p-5">

                    <p className="text-sm text-gray-500">
                      {property.location}
                    </p>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-2 break-words">
                      {property.name}
                    </h3>

                    <p className="text-lg font-semibold mt-3">
                      ₹ {property.price.toLocaleString("en-IN")}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mt-4">

                      <div className="rounded-lg bg-gray-50 p-2.5 text-center">
                        <p className="text-sm font-semibold text-gray-900">
                          {property.beds}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Beds
                        </p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-2.5 text-center">
                        <p className="text-sm font-semibold text-gray-900">
                          {property.baths}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Baths
                        </p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-2.5 text-center">
                        <p className="text-sm font-semibold text-gray-900">
                          {property.area}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Sqft
                        </p>
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-5">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/edit-property/${property._id}`
                          )
                        }
                        className="w-full py-3 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(property._id)
                        }
                        className="w-full py-3 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>

    </div>
  );
};

export default AdminDashboard;