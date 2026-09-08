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
        "http://localhost:5000/api/properties"
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
        `http://localhost:5000/api/properties/${id}`,
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
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">

        <div className="w-full px-5 sm:px-8 lg:px-12 py-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <p className="text-xs sm:text-sm tracking-widest text-yellow-700 uppercase">
                Yaseen Realtor
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  navigate("/admin/add-property")
                }
                className="flex-1 sm:flex-none px-5 py-3 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
              >
                + Add Property
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 sm:flex-none px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm hover:bg-gray-50 transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* Dashboard Content */}
      <main className="w-full px-5 sm:px-8 lg:px-12 py-8 sm:py-10">

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 mb-8">

          <p className="text-sm text-gray-500">
            Total Properties
          </p>

          <h2 className="text-3xl font-bold mt-1">
            {properties.length}
          </h2>

        </div>

        {/* Properties */}
        <div>

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl sm:text-2xl font-bold">
              Properties
            </h2>

          </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200"
                >

                  {/* Image */}
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-56 sm:h-64 object-cover"
                  />

                  {/* Details */}
                  <div className="p-5">

                    <p className="text-sm text-gray-500">
                      {property.location}
                    </p>

                    <h3 className="text-xl font-bold mt-2">
                      {property.name}
                    </h3>

                    <p className="text-lg font-semibold mt-3">
                      ₹ {property.price.toLocaleString("en-IN")}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span>
                        {property.beds} Beds
                      </span>

                      <span>
                        {property.baths} Baths
                      </span>

                      <span>
                        {property.area} sqft
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/edit-property/${property._id}`
                          )
                        }
                        className="flex-1 py-3 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(property._id)
                        }
                        className="flex-1 py-3 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;