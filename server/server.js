const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/propertyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();



const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://yaseenrealtor.vercel.app",
      "https://user-three-ruby.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Yaseen Realtor API is running");
});

app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});