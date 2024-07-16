const cron = require("node-cron");
const express = require("express");
const { claimMission } = require("./func/ClaimMission");
const { claimOfflineProfit } = require("./func/ClaimOfflineProfit");
const { checkValidToken, validateToken } = require("./func/CheckValidToken");
const { buyAnimal } = require("./func/BuyAnimal");

// Schedule the task to run every hour on the hour
claimMission();
claimOfflineProfit();
buyAnimal();

cron.schedule("0 * * * *", claimMission);
cron.schedule("0 * * * *", claimOfflineProfit);
// Start the server
const port = process.env.PORT || 105;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
