const { default: axios } = require("axios");
const { configDotenv } = require("dotenv");
const { getAuthToken } = require("./getAuthToken");
configDotenv();

exports.validateToken = async () => {
  const API_URL = "https://api.prod.piggypiggy.io/game/GetDailyTaskInfo";
  const tokens = await getAuthToken();

  const validToken = [];
  for (const token of tokens) {
    try {
      await axios.post(
        API_URL,
        {
          PlayerID: 0,
        },
        {
          headers: {
            Authorization: `bearer ${token.token}`,
          },
        }
      );

      console.log(`[ BOT ] : Checking token done..`);
      validToken.push(token);
    } catch (error) {
      console.log(error);
      console.log(`[ Error ] : validate token failed`);
    }
  }
  return validToken;
};
