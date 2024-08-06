const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.CreateStarPay = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      await axios
        .post(
          "https://api.prod.piggypiggy.io/game/CreateStarPay",
          { PlayerID: 0, Page: 1, PageSize: 1 },
          {
            headers: {
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((response) => {
          console.log(
            `[ Running ] : Create StarPay successfully. retCode: ${response.data.data.retCode}`
          );
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};
