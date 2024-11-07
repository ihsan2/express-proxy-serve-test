const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Proxy endpoint to forward requests to faceio.net API
app.post('/setfacialidpincode', async (req, res) => {
  try {
    const response = await axios.post(`https://api.faceio.net/setfacialidpincode`, req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    res.json(response.data); // Send the API's response back to the client
  } catch (error) {
    console.error('Error in proxy request:', error.response?.data);
    res.status(error.response?.status || 500).json({ ...error.response?.data });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
