import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeImage, setActiveImage] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
      return;
    }

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

        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

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

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <p>{error}</p>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  const images =
  property.images && property.images.length > 0
    ? property.images
    : property.image
      ? [property.image]
      : [];

  const nextImage = () => {
    if (images.length === 0) return;

    setActiveImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    if (images.length === 0) return;

    setActiveImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  };

  const whatsappNumber = "918089525426";

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in ${property.name} in ${property.location}.`
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          {/* IMAGE GALLERY */}

          <div style={{ padding: "20px" }}>
            {images.length > 0 ? (
              <>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <img
                    src={images[activeImage]}
                    alt={property.name}
                    style={{
                      width: "100%",
                      height: "500px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      display: "block",
                    }}
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        style={{
                          position: "absolute",
                          left: "15px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          border: "none",
                          background:
                            "rgba(0,0,0,0.55)",
                          color: "#fff",
                          fontSize: "22px",
                          cursor: "pointer",
                        }}
                      >
                        ‹
                      </button>

                      <button
                        onClick={nextImage}
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          border: "none",
                          background:
                            "rgba(0,0,0,0.55)",
                          color: "#fff",
                          fontSize: "22px",
                          cursor: "pointer",
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}

                  <div
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      right: "15px",
                      background:
                        "rgba(0,0,0,0.65)",
                      color: "#fff",
                      padding: "6px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {activeImage + 1} / {images.length}
                  </div>
                </div>

                {/* THUMBNAILS */}

                {images.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      overflowX: "auto",
                      marginTop: "12px",
                      paddingBottom: "5px",
                    }}
                  >
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setActiveImage(index)
                        }
                        style={{
                          border:
                            activeImage === index
                              ? "3px solid #111"
                              : "2px solid #ddd",
                          padding: "0",
                          borderRadius: "7px",
                          overflow: "hidden",
                          background: "#fff",
                          cursor: "pointer",
                          flex: "0 0 auto",
                        }}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${
                            index + 1
                          }`}
                          style={{
                            width: "90px",
                            height: "70px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#eee",
                  borderRadius: "10px",
                }}
              >
                No images available
              </div>
            )}
          </div>

          {/* PROPERTY DETAILS */}

          <div
            style={{
              padding: "20px",
            }}
          >
            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "32px",
              }}
            >
              {property.name}
            </h1>

            <p
              style={{
                color: "#666",
                marginBottom: "20px",
              }}
            >
              📍 {property.location}
            </p>

            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              ₹ {Number(property.price).toLocaleString("en-IN")}
            </h2>

            <div
              style={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
                marginBottom: "25px",
              }}
            >
              <span>🛏 {property.beds} Beds</span>
              <span>🛁 {property.baths} Baths</span>
              <span>📐 {property.area} sq ft</span>
            </div>

            <p
              style={{
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "25px",
              }}
            >
              {property.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setShowBooking(true)}
                style={{
                  padding: "13px 22px",
                  border: "none",
                  borderRadius: "7px",
                  background: "#111",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Book Property
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "13px 22px",
                  borderRadius: "7px",
                  background: "#25D366",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}

      {showBooking && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "450px",
              padding: "25px",
              borderRadius: "12px",
            }}
          >
            <h2>Book Property</h2>

            <p
              style={{
                color: "#666",
                lineHeight: "1.6",
              }}
            >
              Thank you for your interest in{" "}
              <strong>{property.name}</strong>.
              <br />
              Please contact us to continue with the
              booking.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "12px 18px",
                  background: "#25D366",
                  color: "#fff",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                Contact on WhatsApp
              </a>

              <button
                onClick={() => setShowBooking(false)}
                style={{
                  padding: "12px 18px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;