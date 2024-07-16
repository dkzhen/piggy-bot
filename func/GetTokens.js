const axios = require("axios");
const { configDotenv } = require("dotenv");
const fs = require("fs").promises;
configDotenv();

exports.getTokens = async () => {
  const API_TOKEN = process.env.API_TOKEN || "http://localhost:101";

  try {
    const data = await fs.readFile("configs/config.json", "utf-8");
    const tokens = JSON.parse(data);
    return tokens;
  } catch (error) {
    try {
      const response = await axios.get(`${API_TOKEN}/token/@cowtopiabot`);
      const [token] = response.data.data;
      return token;
    } catch (error) {
      console.log("error fetching api token");
      return null;
    }
  }
};
