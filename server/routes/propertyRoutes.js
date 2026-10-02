const express = require("express");

const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const protectAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProperties);

router.get("/:id", getPropertyById);

router.post(
  "/",
  protectAdmin,
  upload.array("images", 10),
  createProperty
);

router.put(
  "/:id",
  protectAdmin,
  upload.array("images", 10),
  updateProperty
);

router.delete(
  "/:id",
  protectAdmin,
  deleteProperty
);

module.exports = router;