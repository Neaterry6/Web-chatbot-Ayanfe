const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chatbot API endpoint
app.get("/chat", async (req, res) => {
  const { query } = req.query; // Get the query from the request query parameters

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Call the external API using a GET request
    const response = await axios.get(
      `https://ayanfe-ai.onrender.com/Ai?query=${encodeURIComponent(query)}`
    );

    // Send the API response back to the frontend
    res.json({ response: response.data });
  } catch (error) {
    console.error("Error calling chatbot API:", error);
    res.status(500).json({ error: "Failed to fetch response from chatbot" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
