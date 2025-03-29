import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for coordinates
let coordinates = { lat: 20.5937, lng: 78.9629 }; // Default coordinates (e.g., India)

// Endpoint to receive coordinates (POST)
app.post("/api/coordinates", (req, res) => {
  const { lat, lng } = req.body;
  console.log("Received coordinates:", { lat, lng });

  // Update the in-memory coordinates
  coordinates = { lat, lng };

  res.status(200).json({ message: "Coordinates received successfully!", lat, lng });
});

// Endpoint to send coordinates (GET)
app.get("/api/coordinates", (req, res) => {
  console.log("Sending coordinates to frontend:", coordinates);
  res.status(200).json(coordinates); // Send the stored coordinates
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});