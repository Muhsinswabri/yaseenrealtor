import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "Malappuram",
    price: "",
    beds: "",
    baths: "",
    area: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/properties/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch property");
          return;
        }

        setFormData({
          name: data.name || "",
          location: data.location || "Malappuram",
          price: data.price || "",
          beds: data.beds || "",
          baths: data.baths || "",
          area: data.area || "",
          image: data.image || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            location: formData.location,
            price: Number(formData.price),
            beds: Number(formData.beds),
            baths: Number(formData.baths),
            area: Number(formData.area),
            image: formData.image,
            description: formData.description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update property");
        return;
      }

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Update property failed:", error);
      setError("Unable to connect to server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
        <p className="text-gray-500">
          Loading property...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">

        <div className="px-5 sm:px-8 lg:px-12 py-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <p className="text-xs sm:text-sm tracking-widest text-yellow-700 uppercase">
                Yaseen Realtor
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold mt-1">
                Edit Property
              </h1>
            </div>

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 bg-white text-sm hover:bg-gray-50 transition"
            >
              ← Back to Dashboard
            </button>

          </div>

        </div>

      </header>

      {/* Form */}
      <main className="w-full px-5 sm:px-8 lg:px-12 py-8 sm:py-10">

        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 lg:p-10">

          <div className="mb-8">

            <h2 className="text-xl sm:text-2xl font-bold">
              Update Property Information
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Update the details of this property.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Property Name */}
            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Property Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter property name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
              />

            </div>

            {/* Location */}
            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Location
              </label>

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900 bg-white"
              >
                <option value="Malappuram">
                  Malappuram
                </option>

                <option value="Kozhikode">
                  Kozhikode
                </option>

                <option value="Ernakulam">
                  Ernakulam
                </option>
              </select>

            </div>

            {/* Price */}
            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter property price"
                required
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
              />

            </div>

            {/* Beds / Baths / Area */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">

              <div>

                <label className="block text-sm font-medium mb-2">
                  Beds
                </label>

                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="Beds"
                  required
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
                />

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  Baths
                </label>

                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  placeholder="Baths"
                  required
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
                />

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  Area (sqft)
                </label>

                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Area"
                  required
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
                />

              </div>

            </div>

            {/* Image URL */}
            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/property-image.jpg"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
              />

            </div>

            {/* Description */}
            <div className="mb-6">

              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter property description"
                required
                rows="6"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900 resize-none"
              />

            </div>

            {/* Error */}
            {error && (
              <p className="mb-5 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">

              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="w-full sm:flex-1 py-3 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:flex-1 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {saving
                  ? "Updating Property..."
                  : "Update Property"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};

export default EditProperty;