import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to receive coordinates
app.post("/api/coordinates", (req, res) => {
  const { lat, lng } = req.body;
  console.log("Received coordinates:", { lat, lng });

  // Process the coordinates (e.g., store in a database)
  res.status(200).json({ message: "Coordinates received successfully!", lat, lng });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});