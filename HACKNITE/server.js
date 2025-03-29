import express from "express";
import cors from "cors";
import multer from "multer";
import { exec } from "child_process";
import axios from "axios";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Constants for APIs
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse?format=json";
const WEATHER_API_KEY = "a002f5b7e08fef73ab9f5efca4598b54"; // Replace with your OpenWeatherMap API key
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for coordinates
let coordinates = { lat: 20.5937, lng: 78.9629 }; // Default coordinates (India)

// Configure Multer for image uploads
const upload = multer({ dest: "uploads/" });

// Helper function to get state from coordinates
const getStateFromCoordinates = async (lat, lng) => {
  try {
    const response = await axios.get(`${NOMINATIM_URL}&lat=${lat}&lon=${lng}`);
    const address = response.data.address;

    if (address && address.state) {
      console.log(`State determined from coordinates: ${address.state}`);
      return address.state; // Extract state name
    }
    console.error("State could not be determined from coordinates.");
    return "Unknown State";
  } catch (error) {
    console.error("Error fetching state:", error);
    return "Unknown State";
  }
};

// Helper function to get the current month in uppercase (e.g., JAN, FEB)
const getCurrentMonth = () => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  console.log(`Current month determined: ${currentMonth}`);
  return currentMonth;
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

// Endpoint to predict rainfall (GET)
app.get("/api/predict-rainfall", async (req, res) => {
  try {
    // Get the state from stored coordinates
    const state = await getStateFromCoordinates(coordinates.lat, coordinates.lng);
    if (state === "Unknown State") {
      console.error("Failed to determine the state from coordinates.");
      return res.status(400).json({ error: "Unable to determine the state from coordinates." });
    }

    // Get the current month
    const month = getCurrentMonth();

    // Hardcoded year (you can make it dynamic if needed)
    const year = new Date().getFullYear();
    console.log(`Year determined: ${year}`);

    // Log inputs being sent to the Python script
    console.log(`Preparing to call Python script with inputs: state=${state}, year=${year}, month=${month}`);

    // Execute the Python script for rainfall prediction
    const pythonScriptPath = path.join(__dirname, "predict_image.py");
    const inputData = JSON.stringify({ state, year, month }); // Input data for the Python script

    exec(`python ${pythonScriptPath} '${inputData}'`, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing Python script:", error);
        return res.status(500).json({ error: "Failed to execute the rainfall prediction model." });
      }

      if (stderr) {
        console.error("Python script stderr:", stderr);
        return res.status(500).json({ error: "Error in Python script execution." });
      }

      try {
        // Parse the output from the Python script
        const result = JSON.parse(stdout);
        console.log("Rainfall prediction result received from Python script:", result);

        // Return the prediction result to the frontend
        res.status(200).json(result);
      } catch (parseError) {
        console.error("Error parsing Python script output:", parseError);
        return res.status(500).json({ error: "Invalid response from the rainfall prediction model." });
      }
    });
  } catch (geoError) {
    console.error("Error during reverse geocoding:", geoError);
    res.status(500).json({ error: "Failed to determine the state from coordinates." });
  }
});

// Endpoint to fetch weather data (GET)
app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lng } = coordinates;
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);
    const weatherData = response.data;

    // Extract relevant information
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const rainfall = weatherData.rain ? weatherData.rain["1h"] || 0 : 0; // Rainfall in the last hour

    res.status(200).json({
      temperature,
      humidity,
      rainfall,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});


const runPrediction = (filePath) => {
  return new Promise((resolve, reject) => {
      const pythonScriptPath = path.join(__dirname, "predict_image.py");
      console.log("Executing Python script:", pythonScriptPath);

      exec(`python "${pythonScriptPath}" "${filePath}"`, (error, stdout, stderr) => {
          if (error) {
              console.error("Execution error:", error);
              return reject("Failed to execute the prediction model.");
          }

          if (stderr) {
              console.error("Python script stderr:", stderr);
          }

          try {
              // Extract only the last valid JSON from the output
              const jsonLines = stdout.trim().split("\n");
              const lastJsonLine = jsonLines[jsonLines.length - 1];
              const result = JSON.parse(lastJsonLine);
              resolve(result);
          } catch (parseError) {
              console.error("Error parsing Python output:", parseError, stdout);
              reject("Invalid response from the prediction model.");
          }
      });
  });
};



// Endpoint to handle image upload and prediction
app.post("/api/predict-image", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path; // Path to the uploaded image
    console.log("Uploaded image path:", filePath);

    // Run the TensorFlow model prediction
    const predictionResult = await runPrediction(filePath);

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Send the prediction result to the frontend
    res.status(200).json(predictionResult);
  } catch (error) {
    console.error("Error during image prediction:", error);
    res.status(500).json({ error: "Failed to process the image." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});