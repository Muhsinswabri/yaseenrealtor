import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AuthModal from "../components/authModal";

const properties = [
  {
    id: "1",
    location: "Malappuram",
    name: "Modern Home",
    price: "₹ 85,00,000",
    beds: "3 Beds",
    baths: "3 Baths",
    area: "1800 sqft",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: "2",
    location: "Kozhikode",
    name: "Premium Apartment",
    price: "₹ 62,00,000",
    beds: "2 Beds",
    baths: "2 Baths",
    area: "1250 sqft",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
  },
  {
    id: "3",
    location: "Ernakulam",
    name: "Luxury Villa",
    price: "₹ 1,20,00,000",
    beds: "4 Beds",
    baths: "4 Baths",
    area: "2500 sqft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
];

const Property = () => {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showAuth, setShowAuth] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties =
    selectedLocation === "All"
      ? properties
      : properties.filter(
          (property) => property.location === selectedLocation
        );

  return (
    <div className="w-full min-h-screen bg-white">

      <Navbar />

      {/* Page Header */}
      <section className="w-full px-16 py-16 text-center">

        <p className="text-sm tracking-widest text-yellow-700 uppercase">
          Explore Properties
        </p>

        <h1 className="text-5xl font-bold mt-3">
          Find Your Perfect Property
        </h1>

        <p className="text-gray-500 mt-4">
          Explore properties available in your preferred location.
        </p>

      </section>


      {/* Location Filter */}
      <section className="w-full px-16">

        <div className="flex justify-center gap-5">

          <button
            onClick={() => setSelectedLocation("All")}
            className={`px-8 py-3 rounded-full ${
              selectedLocation === "All"
                ? "bg-gray-900 text-white"
                : "border border-gray-300"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setSelectedLocation("Malappuram")}
            className={`px-8 py-3 rounded-full ${
              selectedLocation === "Malappuram"
                ? "bg-gray-900 text-white"
                : "border border-gray-300"
            }`}
          >
            Malappuram
          </button>

          <button
            onClick={() => setSelectedLocation("Kozhikode")}
            className={`px-8 py-3 rounded-full ${
              selectedLocation === "Kozhikode"
                ? "bg-gray-900 text-white"
                : "border border-gray-300"
            }`}
          >
            Kozhikode
          </button>

          <button
            onClick={() => setSelectedLocation("Ernakulam")}
            className={`px-8 py-3 rounded-full ${
              selectedLocation === "Ernakulam"
                ? "bg-gray-900 text-white"
                : "border border-gray-300"
            }`}
          >
            Ernakulam
          </button>

        </div>

      </section>


      {/* Properties */}
      <section className="w-full px-16 py-14">

        <div className="grid grid-cols-3 gap-8">

          {filteredProperties.map((property) => (

            <div
              key={property.id}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >

              <img
                src={property.image}
                alt={property.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <p className="text-sm text-gray-500">
                  {property.location}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {property.name}
                </h2>

                <p className="text-xl font-semibold mt-3">
                  {property.price}
                </p>

                <div className="flex gap-5 mt-4 text-sm text-gray-500">
                  <span>{property.beds}</span>
                  <span>{property.baths}</span>
                  <span>{property.area}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedProperty(property.id);
                    setShowAuth(true);
                  }}
                  className="w-full mt-6 py-3 bg-gray-900 text-white rounded-lg"
                >
                  View Property →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


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

export default Property;