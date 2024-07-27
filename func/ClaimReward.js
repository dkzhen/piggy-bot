const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

const checkAvailableClaim = async (token) => {
  const CLAIM_FARMING_API =
    "https://game-domain.blum.codes/api/v1/user/balance";

  const now = new Date();

  try {
    const response = await axios.get(CLAIM_FARMING_API, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    const endTime = new Date(response.data.farming.endTime);

    return now > endTime;
  } catch (error) {
    console.error("Error checking claim:", error);
    return false;
  }
};
exports.claimRewards = async () => {
  const CLAIM_FARMING_API =
    "https://game-domain.blum.codes/api/v1/farming/claim";

  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      try {
        const available = await checkAvailableClaim(token);
        if (available) {
          try {
            const claim = await axios.post(
              CLAIM_FARMING_API,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token.token}`,
                },
              }
            );

            `[ Running ] : Farming rewards successfully claimed. ${claim.data}`;
            const start = await axios.post(
              "https://game-domain.blum.codes/api/v1/farming/start",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token.token}`,
                },
              }
            );
            console.log(start.data);
          } catch (error) {
            if (error.response.status === 425) {
              console.log(`[ BOT ] : It's too early to claim`);
            }
          }
        } else {
          console.log(`[ completed ] : No need claim farming.`);
        }
      } catch (error) {
        console.log(`[ Error ] : error from claim farming. ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`[ Error ] : error from claim rewards. ${error.message}`);
  }
};
