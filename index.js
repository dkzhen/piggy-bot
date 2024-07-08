const cron = require("node-cron");
const express = require("express");
const monitorGasAndExecute = require("./func/MonitorGasFee");
const { contractAddress, privateKey } = require("./configs/config");
const { contractABI } = require("./configs/ABI");
const { claimMission } = require("./func/ClaimMission");

// Schedule the task to run every hour on the hour
claimMission();
cron.schedule("0 * * * *", claimMission);

// Start the server
const port = process.env.PORT || 102;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  await monitorGasAndExecute(contractAddress, contractABI, privateKey);
  console.log(`Server is running on port ${port}`);
});
