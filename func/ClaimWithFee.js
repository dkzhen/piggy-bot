const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
async function callAPI() {
  const url = "https://miniapp-api.singsing.net/claim";
  const token = process.env.token;

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { sign, expire_time } = response.data.data;
    return { sign, expire_time };
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
}

module.exports = callAPI;
