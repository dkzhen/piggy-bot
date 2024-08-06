const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { getAuthToken } = require("./func/getAuthToken");
const { validateToken } = require("./func/CheckValidToken");
const { Task } = require("./func/Task");
const { CreateStarPay } = require("./func/CreateStarPay");
configDotenv();
// Schedule the task to run every hour on the hour

Task();
CreateStarPay();
cron.schedule("0 0 * * *", Task);
cron.schedule("0 0 * * *", CreateStarPay);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
