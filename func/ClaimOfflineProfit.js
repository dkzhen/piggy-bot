const axios = require("axios");
const fs = require("fs").promises;

exports.claimOfflineProfit = async function () {
    const CLAIM_API_URL = "https://cowtopia-be.tonfarmer.com/user/claim-offline-profit";
    const TOKEN_API_URL = "https://cowtopia-be.tonfarmer.com/auth"
try {
    const data = await fs.readFile("configs/config.json", "utf-8");
    const tokens = JSON.parse(data);

    const authTokens = []
    for (const token of tokens) {

      try {
        const res = await axios.post(TOKEN_API_URL, {
        }, {
          headers: {
            "x-tg-data": token.token,
          },
        });
        const accesToken = res.data.data
      
        authTokens.push(accesToken.access_token)
       
      } catch (error) {
        console.log(error.message)
      }
      
    }
    for (const token of authTokens) {
          try {
            const BODY_DATA = {
              "boost": false,
            };

            const claimResponse = await axios.post(CLAIM_API_URL, BODY_DATA, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            console.log(
              `Claimed offline reward succesfully. Response status: ${claimResponse.status}`
            );
            console.log({
                profit: claimResponse.data.data.profit,
                money: claimResponse.data.data.user.money,
            });
          } catch (error) {
            console.error(
              `Error claiming offline rewards:`,
              error.response.status
            );
          }
        
      }
    
} catch (error) {
    
}

}

