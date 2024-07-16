const axios = require("axios");
const { validateToken } = require("./CheckValidToken");
const { buyFactory } = require("./BuyFactory");

exports.buyAnimal = async function () {
  const API_GAME_INFO = "https://cowtopia-be.tonfarmer.com/user/game-info?";
  const API_BUY_ANIMAL = "https://cowtopia-be.tonfarmer.com/factory/buy-animal";

  const tokens = await validateToken();

  for (const token of tokens) {
    try {
      const res = await axios.get(API_GAME_INFO, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      const factories = res.data.data.factories;
      const factoriesIsAvailable = factories.filter(
        (factory) => factory.animal_count < 5 && factory.lock === false
      );
      const money = res.data.data.user.money;

      if (factoriesIsAvailable.length > 0) {
        let autoBuy = true;
        let purchaseCounter = factoriesIsAvailable[0].animal_count;
        const maxPurchases = 5;
        while (autoBuy) {
          if (purchaseCounter >= maxPurchases) {
            autoBuy = false;
            console.log("Maximum purchases animal reached.");
            buyFactory();
          } else if (money >= factoriesIsAvailable[0].animal_cost) {
            const res = await axios.post(
              API_BUY_ANIMAL,
              {
                factory_id: factoriesIsAvailable[0].factory_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token.token}`,
                },
              }
            );

            console.log(res.data.data);
            purchaseCounter++;
          } else {
            console.log("money not enough to buy animal");
            autoBuy = false;
          }
        }
      } else {
        console.log("no factories available");
      }
    } catch (error) {
      console.log("error from buy animal", error.message);
    }
  }
};
