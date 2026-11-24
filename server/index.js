const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Blog API is running!");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        const PORT = process.env.PORT || 4000;
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });