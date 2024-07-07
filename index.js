const axios = require("axios");
const cron = require("node-cron");
const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs").promises;
dotenv.config();

const API_URL = "https://miniapp-api.singsing.net/mission/check";

const BODY_DATA = {
  mission_key: "repost_x1000",
}; // Replace with your actual body data

const hitApi = async () => {
  try {
    // Read the JSON file
    const data = await fs.readFile("config.json", "utf-8");
    const tokens = JSON.parse(data);

    // Loop through each token and make API requests
    for (const token of tokens) {
      try {
        const response = await axios.post(API_URL, BODY_DATA, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(`Response status: ${response.status}`);
        console.log(response.data);
      } catch (error) {
        console.error(`Error hitting the API with token ${token.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Error reading the tokens file:", error);
  }
};
hitApi();
// Schedule the task to run every hour on the hour
cron.schedule("0 * * * *", hitApi);

// Start the server
const port = process.env.PORT || 102;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
