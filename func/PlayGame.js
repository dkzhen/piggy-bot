const axios = require("axios");
const { validateToken } = require("./CheckValidToken");
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createGame(token, API_CREATE_GAME) {
  const play = await axios.post(
    API_CREATE_GAME,
    {},
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return play.data.gameId;
}

const claimReward = async (token, API_CLAIM_REWARD, gameId) => {
  const randomNumber = getRandomNumber(200, 300);
  const claim = await axios.post(
    API_CLAIM_REWARD,
    {
      gameId: gameId,
      points: randomNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return claim.data;
};

async function checkAvailableGame(token) {
  const BALANCE_API = "https://game-domain.blum.codes/api/v1/user/balance";
  const playPasses = await axios.get(BALANCE_API, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  return playPasses.data.playPasses;
}

async function delayedExecution(count) {
  console.log(`[ ${count} ] Game started...`);
  await new Promise((resolve) => setTimeout(resolve, 40000));
  console.log(`[ ${count} ] Game ended...`);
}

exports.playGame = async () => {
  const API_CREATE_GAME = "https://game-domain.blum.codes/api/v1/game/play";
  const API_CLAIM_REWARD = "https://game-domain.blum.codes/api/v1/game/claim";

  const tokens = await validateToken();

  try {
    for (const token of tokens) {
      const availableGame = await checkAvailableGame(token);
      if (availableGame <= 1) {
        console.log(`[ Completed ] : no game available to play`);
      } else {
        let gameCount = await checkAvailableGame(token);
        let count = 1;
        while (gameCount > 1) {
          const gameId = await createGame(token, API_CREATE_GAME);
          await delayedExecution(count);
          const claim = await claimReward(token, API_CLAIM_REWARD, gameId);
          console.log(claim);

          gameCount--;
          count++;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
