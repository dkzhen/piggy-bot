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
      const info = await axios.post(
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
      const infoUsers = info.data.data.mapTask;
      if (infoUsers) {
        console.log(`[ BOT ] : Info mission`);
        console.log(
          `[ BOT ] : taskID : ${infoUsers["1001"].taskID} - Completed : ${infoUsers["1001"].compeleteCount}/2\n[ BOT ] : taskID : ${infoUsers["1002"].taskID} - Completed : ${infoUsers["1002"].compeleteCount}/5\n[ BOT ] : taskID : ${infoUsers["1003"].taskID} - Completed : ${infoUsers["1003"].compeleteCount}/8\n[ BOT ] : taskID : ${infoUsers["1004"].taskID} - Completed : ${infoUsers["1004"].compeleteCount}/8\n[ BOT ] : taskID : ${infoUsers["1005"].taskID} - Completed : ${infoUsers["1005"].compeleteCount}/5\n[ BOT ] : taskID : ${infoUsers["1006"].taskID} - Completed : ${infoUsers["1006"].compeleteCount}/5\n[ BOT ] : taskID : ${infoUsers["9002"].taskID} - Completed : ${infoUsers["9002"].compeleteCount}/1`
        );
      }

      console.log(`[ BOT ] : Checking token done..`);
      validToken.push(token);
    } catch (error) {
      console.log(error);
      console.log(`[ Error ] : validate token failed`);
    }
  }
  return validToken;
};
