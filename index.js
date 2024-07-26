const cron = require("node-cron");
const express = require("express");
const { getAuthToken } = require("./func/getAuthToken");
const { validateToken } = require("./func/CheckValidToken");
const { playGame } = require("./func/PlayGame");
const { claimRewards } = require("./func/ClaimReward");
const { DailyRewards } = require("./func/DailyReward");
const { mission, claimMission } = require("./func/Mission");

// Schedule the task to run every hour on the hour
playGame();
claimMission();
claimRewards();
mission();
cron.schedule("0 * * * *", playGame);
cron.schedule("0 * * * *", claimMission);
cron.schedule("0 * * * *", claimRewards);
cron.schedule("0 * * * *", mission);

cron.schedule("0 0 * * *", DailyRewards);

// Start the server
const port = process.env.PORT || 105;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
