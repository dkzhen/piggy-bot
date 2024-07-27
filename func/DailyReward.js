const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.DailyRewards = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      try {
        const claim = await axios.post(
          "https://game-domain.blum.codes/api/v1/daily-reward?offset=-420",
          {},
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        console.log(
          `[ Running ] : Daily rewards successfully claimed. ${claim.data}`
        );
      } catch (error) {
        console.log(`[ Error ] : Daily rewards failed. ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`[ Error ] : Daily rewards failed. ${error.message}`);
  }
};
