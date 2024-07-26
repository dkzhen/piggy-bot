const axios = require("axios");
const { configDotenv } = require("dotenv");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_TOKEN = process.env.API_TOKEN || "http://localhost:101";
  const API_AUTH =
    "https://gateway.blum.codes/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP";
  const API_BE_URL = process.env.API_TOKEN || "http://localhost:101";
  try {
    const data = await fs.readFile("configs/config.json", "utf-8");
    const tokens = JSON.parse(data);

    const authToken = [];

    for (const token of tokens) {
      try {
        const response = await axios.post(API_AUTH, { query: token.token });

        const auth = response.data.token.refresh;
        authToken.push({ token: auth });
      } catch (error) {
        console.log(error);
      }
    }
    return authToken;
  } catch (error) {
    try {
      const authToken = [];
      const response = await axios.get(`${API_TOKEN}/token/@BlumCryptoBot`);
      const [tokens] = response.data.data;
      for (const token of tokens) {
        try {
          const response = await axios.post(API_AUTH, { query: token.token });

          const auth = response.data.token.refresh;
          authToken.push({ token: auth });
        } catch (error) {
          if (token.telegramId === undefined) {
            console.log(`Invalid token: ${token.token}`);
          } else {
            console.log(`Invalid token: ${token.token}`);
            await axios.post(`${API_BE_URL}/bot/sendMessage`, {
              chatId: token.telegramId,
              tokenId: token.id,
              message: `Token expired or invalid: \n Bot : ${token.botId} \n TelegramId : ${token.telegramId} \n Token : ${token.token}`,
            });
          }
        }
      }

      return authToken;
    } catch (error) {
      console.log("error fetching api token");
      return null;
    }
  }
};
