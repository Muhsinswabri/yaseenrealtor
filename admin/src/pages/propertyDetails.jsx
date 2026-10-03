import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useAuth } from "../context/authContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();

  const [showBooking, setShowBooking] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/properties/${id}`
        );

        const data = await response.json();

        setProperty(data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-5">
        <p className="text-gray-500">
          Loading property...
        </p>
      </div>
    );
  }

  if (!property || property.message === "Property not found") {
    return (
      <div className="w-full min-h-screen bg-white">

        <Navbar />

        <div className="min-h-[60vh] flex items-center justify-center px-5">
          <h1 className="text-xl sm:text-2xl font-bold">
            Property not found
          </h1>
        </div>

        <Footer />

      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;

    const message = `
Hello Yaseen Realtor,

I am interested in the following property.

Property: ${property.name}
Location: ${property.location}
Price: ₹${property.price.toLocaleString("en-IN")}

My Details:

Name: ${name}
Phone: ${phone}
Email: ${email}

I would like to know more about this property and the booking process.
    `;

    const whatsappNumber = "918089525426";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setShowBooking(false);
  };

  return (
    <div className="w-full min-h-screen bg-white">

      <Navbar />

      {/* Property Details */}
      <section className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 lg:py-16">

        {/* Heading */}
        <div>

          <p className="text-xs sm:text-sm text-yellow-700 uppercase tracking-widest">
            Property Details
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            {property.name}
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-3">
            {property.location}
          </p>

        </div>

        {/* Image + Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-8 lg:mt-10">

          {/* Property Image */}
          <div>

            <img
              src={property.image}
              alt={property.name}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl"
            />

          </div>

          {/* Property Information */}
          <div className="flex flex-col justify-center">

            <p className="text-2xl sm:text-3xl font-bold">
              ₹ {property.price.toLocaleString("en-IN")}
            </p>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 text-gray-600">

              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                <p className="font-semibold text-gray-900">
                  {property.beds}
                </p>

                <p className="text-xs sm:text-sm mt-1">
                  Beds
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                <p className="font-semibold text-gray-900">
                  {property.baths}
                </p>

                <p className="text-xs sm:text-sm mt-1">
                  Baths
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                <p className="font-semibold text-gray-900">
                  {property.area}
                </p>

                <p className="text-xs sm:text-sm mt-1">
                  Sqft
                </p>
              </div>

            </div>

            {/* Description */}
            <p className="mt-7 sm:mt-8 text-sm sm:text-base text-gray-600 leading-relaxed">
              {property.description}
            </p>

            {/* Booking Button */}
            <button
              onClick={() => setShowBooking(true)}
              className="mt-7 sm:mt-8 w-full py-3.5 sm:py-4 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Book Property
            </button>

          </div>

        </div>

      </section>

      <Footer />

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">

            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4">

              <h2 className="text-xl sm:text-2xl font-bold">
                Book Property
              </h2>

              <button
                onClick={() => setShowBooking(false)}
                className="text-2xl text-gray-500 hover:text-gray-900"
              >
                ×
              </button>

            </div>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Send your booking request for {property.name}.
            </p>

            {/* Booking Form */}
            <form
              onSubmit={handleBooking}
              className="mt-6"
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 outline-none focus:border-gray-900"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 outline-none focus:border-gray-900"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 mb-6 outline-none focus:border-gray-900"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 py-3 text-white hover:bg-gray-800 transition"
              >
                Send Enquiry on WhatsApp
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default PropertyDetails;