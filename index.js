const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { getAuthToken } = require("./func/getAuthToken");
const { validateToken } = require("./func/CheckValidToken");
const { Task } = require("./func/Task");
const { CreateStarPay } = require("./func/CreateStarPay");
const { initTask } = require("./func/initTask");
configDotenv();
// Schedule the task to run every hour on the hour
const main = async () => {
  await initTask();
  await Task();
  CreateStarPay();
};

main();
cron.schedule("0 * * * *", CreateStarPay);
cron.schedule("0 * * * *", Task);
cron.schedule("0 * * * *", initTask);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
