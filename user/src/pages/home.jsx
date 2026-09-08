import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import AuthModal from "../components/authModal";
import Footer from "../components/footer";
import yaseen from "../assets/yaseen.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { isLoggedIn } = useAuth();

  const [showAuth, setShowAuth] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  return (
    <div className="w-full min-h-screen bg-white">

      <Navbar />

      {/* Hero Section */}
      <section className="w-full min-h-[88vh] flex flex-col lg:flex-row">

        {/* Hero Content */}
        <div className="w-full lg:w-1/2 px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-0 flex items-center">

          <div className="w-full">

            <p className="text-xs sm:text-sm tracking-widest text-yellow-700 uppercase mb-4">
              Your Trusted Real Estate Consultant
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Find Your Next Property With Confidence
            </h1>

            <p className="mt-5 lg:mt-6 text-base sm:text-lg text-gray-600 max-w-xl">
              Quality properties. Better opportunities.
              <br />
              Let's build your future together.
            </p>

            <Link
              to="/property"
              className="mt-7 lg:mt-8 inline-block px-6 sm:px-7 py-3.5 sm:py-4 bg-gray-900 text-white rounded-lg"
            >
              Explore Properties →
            </Link>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-10 lg:mt-12">

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  100+
                </h3>

                <p className="text-sm sm:text-base text-gray-500">
                  Happy Clients
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  3+
                </h3>

                <p className="text-sm sm:text-base text-gray-500">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Trusted
                </h3>

                <p className="text-sm sm:text-base text-gray-500">
                  Real Estate Consultant
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Hero Image */}
        <div className="relative w-full lg:w-1/2 h-[55vh] lg:h-[88vh]">

          <img
            src={yaseen}
            alt="Yaseen Realtor"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-y-0 left-0 w-full lg:w-1/3 bg-gradient-to-r from-white to-transparent"></div>

        </div>

      </section>

      {/* Property Section */}
      <section className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20">

        {/* Section Heading */}
        <div className="text-center">

          <p className="text-xs sm:text-sm tracking-widest text-yellow-700 uppercase">
            Explore Properties
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Properties in Your Preferred Location
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-3">
            Discover properties from trusted locations.
          </p>

        </div>

        {/* Location Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-8 lg:mt-10">

          <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gray-900 text-white text-sm sm:text-base">
            All
          </button>

          <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-300 text-sm sm:text-base">
            Malappuram
          </button>

          <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-300 text-sm sm:text-base">
            Kozhikode
          </button>

          <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-300 text-sm sm:text-base">
            Ernakulam
          </button>

        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 lg:mt-12">

          {loading ? (
            <p className="col-span-full text-center text-gray-500">
              Loading properties...
            </p>
          ) : properties.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No properties available.
            </p>
          ) : (
            properties.map((property) => (
              <div
                key={property._id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >

                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-60 sm:h-64 object-cover"
                />

                <div className="p-5 sm:p-6">

                  <p className="text-sm text-gray-500">
                    {property.location}
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold mt-2">
                    {property.name}
                  </h3>

                  <p className="text-lg sm:text-xl font-semibold mt-3">
                    ₹ {property.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 text-sm text-gray-500">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.area} sqft</span>
                  </div>

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
                    className="w-full mt-6 py-3 bg-gray-900 text-white rounded-lg"
                  >
                    View Property →
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </section>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal */}
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

export default Home;