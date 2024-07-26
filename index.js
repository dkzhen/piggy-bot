const cron = require("node-cron");
const express = require("express");

const { playGame } = require("./func/PlayGame");
const { claimRewards } = require("./func/ClaimReward");
const { DailyRewards } = require("./func/DailyReward");
const { mission, claimMission } = require("./func/Mission");
const { configDotenv } = require("dotenv");
configDotenv();
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
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
