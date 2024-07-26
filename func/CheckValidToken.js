const { default: axios } = require("axios");
const { configDotenv } = require("dotenv");
const { getAuthToken } = require("./getAuthToken");
configDotenv();

exports.validateToken = async () => {
  const API_URL = "https://game-domain.blum.codes/api/v1/tasks";
  const API_BE_URL = process.env.API_TOKEN || "http://localhost:101";
  const tokens = await getAuthToken();

  const validToken = [];
  for (const token of tokens) {
    try {
      await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      console.log("checking token done..");
      validToken.push(token);
    } catch (error) {
      console.log(error);
      console.log("error from validate token");
      if (error.response.status === 401) {
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
  }
  return validToken;
};
