// server/app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import cors from "cors";import cors from "cors";
import cors from "cors";



import helmet from "helmet";
// import xss from "xss-clean";
// import mongoSanitize from "express-mongo-sanitize";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";


dotenv.config();

const app = express();

//  Middleware
// app.use(cors());
app.use(cors({
  origin: "https://book-tracker-client.onrender.com",
  credentials: true
}));
app.use(express.json()); 

// Security middleware
app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());

// Routes 
app.use("/api/users", authRoutes);
app.use("/api/books", bookRoutes);
app.use(errorHandler);


// Test route
app.get("/", (req, res) => {
  res.send("Book Tracker API is running");
});

//  Connect to MongoDB and start server 
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

startServer();

