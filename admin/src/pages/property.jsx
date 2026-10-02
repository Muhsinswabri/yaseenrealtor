import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AuthModal from "../components/authModal";
import { useAuth } from "../context/authContext";

const Property = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showAuth, setShowAuth] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProperties();
  }, []);

  const filteredProperties =
    selectedLocation === "All"
      ? properties
      : properties.filter(
          (property) => property.location === selectedLocation
        );

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-5">
        <p className="text-gray-500">
          Loading properties...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">

      <Navbar />

      {/* Page Heading */}
      <section className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 lg:py-20 text-center">

        <p className="text-xs sm:text-sm tracking-widest text-yellow-700 uppercase">
          Explore Properties
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
          Find Your Perfect Property
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-4 max-w-xl mx-auto">
          Explore properties available in your preferred location.
        </p>

      </section>

      {/* Location Filter */}
      <section className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">

          <button
            onClick={() => setSelectedLocation("All")}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base ${
              selectedLocation === "All"
                ? "bg-gray-900 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setSelectedLocation("Malappuram")}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base ${
              selectedLocation === "Malappuram"
                ? "bg-gray-900 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            Malappuram
          </button>

          <button
            onClick={() => setSelectedLocation("Kozhikode")}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base ${
              selectedLocation === "Kozhikode"
                ? "bg-gray-900 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            Kozhikode
          </button>

          <button
            onClick={() => setSelectedLocation("Ernakulam")}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base ${
              selectedLocation === "Ernakulam"
                ? "bg-gray-900 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            Ernakulam
          </button>

        </div>

      </section>

      {/* Property Cards */}
      <section className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-14 lg:py-16">

        {filteredProperties.length === 0 ? (
          <div className="flex justify-center py-16">
            <p className="text-gray-500">
              No properties available in this location.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >

                {/* Property Image */}
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-60 sm:h-64 object-cover"
                />

                {/* Property Information */}
                <div className="p-5 sm:p-6">

                  <p className="text-sm text-gray-500">
                    {property.location}
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold mt-2">
                    {property.name}
                  </h2>

                  <p className="text-lg sm:text-xl font-semibold mt-3">
                    ₹ {property.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 text-sm text-gray-500">
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

                  {/* View Property */}
                  <button
                    onClick={() => {
                      if (isLoggedIn) {
                        navigate(
                          `/property-details/${property._id}`
                        );
                      } else {
                        setSelectedProperty(property._id);
                        setShowAuth(true);
                      }
                    }}
                    className="w-full mt-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    View Property →
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      <Footer />

      {/* Login / Signup Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            setShowAuth(false);

            navigate(
              `/property-details/${selectedProperty}`
            );
          }}
        />
      )}

    </div>
  );
};

export default Property;