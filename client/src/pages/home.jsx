import React, { useState } from "react";
import Navbar from "../components/navbar";
import AuthModal from "../components/authModal";
import Footer from "../components/footer";
import yaseen from "../assets/yaseen.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white">

      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[88vh] flex items-center">

        {/* Hero Content */}
        <div className="w-1/2 px-16">

          <p className="text-sm tracking-widest text-yellow-700 uppercase mb-4">
            Your Trusted Real Estate Consultant
          </p>

          <h1 className="text-6xl font-bold leading-tight text-gray-900">
            Find Your Next Property With Confidence
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Quality properties. Better opportunities.
            <br />
            Let's build your future together.
          </p>

          <Link
            to="/property"
            className="mt-8 inline-block px-7 py-4 bg-gray-900 text-white rounded-lg"
          >
            Explore Properties →
          </Link>

          {/* Statistics */}
          <div className="flex gap-12 mt-12">

            <div>
              <h3 className="text-3xl font-bold">
                100+
              </h3>

              <p className="text-gray-500">
                Happy Clients
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                3+
              </h3>

              <p className="text-gray-500">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                Trusted
              </h3>

              <p className="text-gray-500">
                Real Estate Consultant
              </p>
            </div>

          </div>

        </div>

        {/* Hero Image */}
        <div className="relative w-1/2 h-[88vh]">

          <img
            src={yaseen}
            alt="Yaseen Realtor"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent"></div>

        </div>

      </section>


      {/* Property Section */}
      <section className="w-full px-16 py-20">

        {/* Section Heading */}
        <div className="text-center">

          <p className="text-sm tracking-widest text-yellow-700 uppercase">
            Explore Properties
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Properties in Your Preferred Location
          </h2>

          <p className="text-gray-500 mt-3">
            Discover properties from trusted locations.
          </p>

        </div>


        {/* Location Buttons */}
        <div className="flex justify-center gap-5 mt-10">

          <button className="px-8 py-3 rounded-full bg-gray-900 text-white">
            All
          </button>

          <button className="px-8 py-3 rounded-full border border-gray-300">
            Malappuram
          </button>

          <button className="px-8 py-3 rounded-full border border-gray-300">
            Kozhikode
          </button>

          <button className="px-8 py-3 rounded-full border border-gray-300">
            Ernakulam
          </button>

        </div>


        {/* Property Cards */}
        <div className="grid grid-cols-3 gap-8 mt-12">


          {/* Property 1 */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">

            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Modern Home"
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <p className="text-sm text-gray-500">
                Malappuram
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Modern Home
              </h3>

              <p className="text-xl font-semibold mt-3">
                ₹ 85,00,000
              </p>

              <div className="flex gap-5 mt-4 text-sm text-gray-500">
                <span>3 Beds</span>
                <span>3 Baths</span>
                <span>1800 sqft</span>
              </div>

              <button
                onClick={() => {
                  setSelectedProperty("1");
                  setShowAuth(true);
                }}
                className="w-full mt-6 py-3 bg-gray-900 text-white rounded-lg"
              >
                View Property →
              </button>

            </div>

          </div>


          {/* Property 2 */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">

            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
              alt="Premium Apartment"
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <p className="text-sm text-gray-500">
                Kozhikode
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Premium Apartment
              </h3>

              <p className="text-xl font-semibold mt-3">
                ₹ 62,00,000
              </p>

              <div className="flex gap-5 mt-4 text-sm text-gray-500">
                <span>2 Beds</span>
                <span>2 Baths</span>
                <span>1250 sqft</span>
              </div>

              <button
                onClick={() => {
                  setSelectedProperty("2");
                  setShowAuth(true);
                }}
                className="w-full mt-6 py-3 bg-gray-900 text-white rounded-lg"
              >
                View Property →
              </button>

            </div>

          </div>


          {/* Property 3 */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">

            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              alt="Luxury Villa"
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <p className="text-sm text-gray-500">
                Ernakulam
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Luxury Villa
              </h3>

              <p className="text-xl font-semibold mt-3">
                ₹ 1,20,00,000
              </p>

              <div className="flex gap-5 mt-4 text-sm text-gray-500">
                <span>4 Beds</span>
                <span>4 Baths</span>
                <span>2500 sqft</span>
              </div>

              <button
                onClick={() => {
                  setSelectedProperty("3");
                  setShowAuth(true);
                }}
                className="w-full mt-6 py-3 bg-gray-900 text-white rounded-lg"
              >
                View Property →
              </button>

            </div>

          </div>

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
            navigate(`/property-details/${selectedProperty}`);
          }}
        />
      )}

    </div>
  );
};

export default Home;