const axios = require("axios");
const { validateToken } = require("./CheckValidToken");
const fs = require("fs").promises;

exports.claimOfflineProfit = async function () {
  const CLAIM_API_URL =
    "https://cowtopia-be.tonfarmer.com/user/claim-offline-profit";

  const tokens = await validateToken();

  for (const token of tokens) {
    try {
      const BODY_DATA = {
        boost: false,
      };

      const claimResponse = await axios.post(CLAIM_API_URL, BODY_DATA, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(
        `Claimed offline reward succesfully. Response status: ${claimResponse.status}`
      );
    } catch (error) {
      console.error(`Error claiming offline rewards`);
    }
  }
};
