import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useAuth } from "../context/authContext";

const properties = [
  {
    id: "1",
    location: "Malappuram, Kerala",
    name: "Modern Home",
    price: "₹ 85,00,000",
    beds: "3 Beds",
    baths: "3 Baths",
    area: "1800 sqft",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description:
      "A beautiful modern home located in Malappuram. This property offers comfortable living spaces, modern interiors and a peaceful residential environment.",
  },
  {
    id: "2",
    location: "Kozhikode, Kerala",
    name: "Premium Apartment",
    price: "₹ 62,00,000",
    beds: "2 Beds",
    baths: "2 Baths",
    area: "1250 sqft",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    description:
      "A premium apartment located in Kozhikode with modern facilities and a comfortable living environment.",
  },
  {
    id: "3",
    location: "Ernakulam, Kerala",
    name: "Luxury Villa",
    price: "₹ 1,20,00,000",
    beds: "4 Beds",
    baths: "4 Baths",
    area: "2500 sqft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description:
      "A luxurious villa in Ernakulam offering spacious interiors, modern architecture and premium living.",
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const property = properties.find(
    (property) => property.id === id
  );

  if (!property) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Property not found
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">

      <Navbar />

      {/* Property Details */}
      <section className="w-full px-16 py-12">

        <p className="text-sm text-yellow-700 uppercase tracking-widest">
          Property Details
        </p>

        <h1 className="text-5xl font-bold mt-3">
          {property.name}
        </h1>

        <p className="text-gray-500 mt-3">
          {property.location}
        </p>


        <div className="grid grid-cols-2 gap-10 mt-10">

          {/* Property Image */}
          <div>

            <img
              src={property.image}
              alt={property.name}
              className="w-full h-[500px] object-cover rounded-2xl"
            />

          </div>


          {/* Property Information */}
          <div className="flex flex-col justify-center">

            <p className="text-3xl font-bold">
              {property.price}
            </p>

            <div className="flex gap-8 mt-6 text-gray-600">
              <span>{property.beds}</span>
              <span>{property.baths}</span>
              <span>{property.area}</span>
            </div>

            <p className="mt-8 text-gray-600 leading-relaxed">
              {property.description}
            </p>

            <button
              onClick={() => alert("Booking request submitted")}
              className="mt-8 w-full py-4 rounded-lg bg-gray-900 text-white"
            >
              Book Property
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default PropertyDetails;