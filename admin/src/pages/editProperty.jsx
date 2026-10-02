import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "Malappuram",
    price: "",
    beds: "",
    baths: "",
    area: "",
    description: "",
  });

  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);

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
          throw new Error(
            data.message || "Failed to fetch property"
          );
        }

        setFormData({
          name: data.name || "",
          location: data.location || "Malappuram",
          price: data.price || "",
          beds: data.beds || "",
          baths: data.baths || "",
          area: data.area || "",
          description: data.description || "",
        });

        setCurrentImages(data.images || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      return;
    }

    if (files.length > 10) {
      setError("You can upload a maximum of 10 images.");
      return;
    }

    setError("");

    setNewImages(files);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("beds", formData.beds);
    data.append("baths", formData.baths);
    data.append("area", formData.area);
    data.append("description", formData.description);

    newImages.forEach((image) => {
      data.append("images", image);
    });

    try {
      setSaving(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update property"
        );
      }

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading property...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>
          Edit Property
        </h1>

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              color: "#c00",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div>
              <label>Property Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Location</label>

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={inputStyle}
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

            <div>
              <label>Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Bedrooms</label>

              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Bathrooms</label>

              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Area (sq ft)</label>

              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: "25px" }}>
            <label>Current Property Images</label>

            {currentImages.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                {currentImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Current property ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        marginTop: "5px",
                      }}
                    >
                      Image {index + 1}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#777" }}>
                No images available.
              </p>
            )}
          </div>

          <div style={{ marginTop: "25px" }}>
            <label>Replace Property Images</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{
                display: "block",
                marginTop: "8px",
              }}
            />

            <small
              style={{
                display: "block",
                marginTop: "8px",
                color: "#666",
              }}
            >
              Select up to 10 new images. Selecting new
              images will replace the current images.
            </small>
          </div>

          {previews.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <p>
                New Images ({newImages.length})
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: "12px",
                }}
              >
                {previews.map((preview, index) => (
                  <div key={index}>
                    <img
                      src={preview}
                      alt={`New property ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        marginTop: "5px",
                      }}
                    >
                      New Image {index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "25px" }}>
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "12px 25px",
                border: "none",
                borderRadius: "6px",
                background: "#111",
                color: "#fff",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {saving
                ? "Uploading..."
                : "Update Property"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/dashboard")
              }
              style={{
                padding: "12px 25px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "7px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  boxSizing: "border-box",
};

export default EditProperty;