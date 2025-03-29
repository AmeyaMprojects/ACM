import express from "express";
import cors from "cors";
import axios from "axios"; // Import axios for API requests

const app = express();
const PORT = 5000;
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse?format=json";

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for coordinates
let coordinates = { lat: 20.5937, lng: 78.9629 }; // Default coordinates (India)

// Function to get state from coordinates
const getStateFromCoordinates = async (lat, lng) => {
  try {
    const response = await axios.get(`${NOMINATIM_URL}&lat=${lat}&lon=${lng}`);
    const address = response.data.address;

    if (address && address.state) {
      return address.state; // Extract state name
    }
    return "Unknown State";
  } catch (error) {
    console.error("Error fetching state:", error);
    return "Unknown State";
  }
};

// Endpoint to receive coordinates (POST)
app.post("/api/coordinates", async (req, res) => {
  const { lat, lng } = req.body;
  console.log("Received coordinates:", { lat, lng });

  // Update in-memory coordinates
  coordinates = { lat, lng };

  // Get state name
  const state = await getStateFromCoordinates(lat, lng);
  console.log(`User is in: ${state}`);

  res.status(200).json({ message: "Coordinates received successfully!", lat, lng, state });
});

// Endpoint to send coordinates (GET)
app.get("/api/coordinates", async (req, res) => {
  console.log("Sending coordinates to frontend:", coordinates);

  // Get state name
  const state = await getStateFromCoordinates(coordinates.lat, coordinates.lng);

  res.status(200).json({ ...coordinates, state });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
