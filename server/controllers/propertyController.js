const Property = require("../models/property");
const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "yaseen-realtor",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({
      createdAt: -1,
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch properties",
    });
  }
};

// Get single property
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch property",
    });
  }
};

// Create property
const createProperty = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one property image is required",
      });
    }

    const uploadResults = await Promise.all(
      req.files.map((file) =>
        uploadImageToCloudinary(file)
      )
    );

    const imageUrls = uploadResults.map(
      (result) => result.secure_url
    );

    const property = await Property.create({
      name: req.body.name,
      location: req.body.location,
      price: Number(req.body.price),
      beds: Number(req.body.beds),
      baths: Number(req.body.baths),
      area: Number(req.body.area),
      images: imageUrls,
      description: req.body.description,
    });

    res.status(201).json(property);
  } catch (error) {
    console.error("Create property error:", error);

    res.status(500).json({
      message: "Failed to create property",
    });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    let imageUrls =
      property.images && property.images.length > 0
        ? property.images
        : [];

    if (req.files && req.files.length > 0) {
      const uploadResults = await Promise.all(
        req.files.map((file) =>
          uploadImageToCloudinary(file)
        )
      );

      imageUrls = uploadResults.map(
        (result) => result.secure_url
      );
    }

    property.name = req.body.name;
    property.location = req.body.location;
    property.price = Number(req.body.price);
    property.beds = Number(req.body.beds);
    property.baths = Number(req.body.baths);
    property.area = Number(req.body.area);
    property.images = imageUrls;
    property.description = req.body.description;

    const updatedProperty = await property.save();

    res.json(updatedProperty);
  } catch (error) {
    console.error("Update property error:", error);

    res.status(500).json({
      message: "Failed to update property",
    });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    await property.deleteOne();

    res.json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);

    res.status(500).json({
      message: "Failed to delete property",
    });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};