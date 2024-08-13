const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.CheckIn = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      await axios
        .post(
          "https://api.prod.piggypiggy.io/game/Sign7Day",
          {
            PlayerID: 0,
            Type: 0,
          },
          {
            headers: {
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((response) => {
          console.log(
            `[ Running ] : CheckIn successfully. retCode: ${response.data.code}`
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
