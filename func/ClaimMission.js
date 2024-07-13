const dotenv = require("dotenv");
const fs = require("fs").promises;
const axios = require("axios");
dotenv.config();

const API_URL = "https://cowtopia-be.tonfarmer.com/mission";
const CLAIM_API_URL = "https://cowtopia-be.tonfarmer.com/mission/check";
const TOKEN_API_URL = "https://cowtopia-be.tonfarmer.com/auth"

exports.claimMission = async function () {
  try {
    // Read the JSON file containing tokens
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
    
   

    // Loop through each token and make a GET request
    for (const token of authTokens) {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const missions = response.data.data; // Assuming missions data is in response.data.data
    
        // Loop through each mission and make API requests
        for (const mission of missions.missions) {
          if (!mission.completed) {
            try {
              const BODY_DATA = {
                mission_key: mission.key,
              };

              const claimResponse = await axios.post(CLAIM_API_URL, BODY_DATA, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });

              console.log(
                `Claimed mission ${mission.key}. Response status: ${claimResponse.status}`
              );
              console.log(claimResponse.data);
            } catch (error) {
              console.error(
                `Error claiming mission ${mission.key}:`,
                error.response.status
              );
            }
          }
        }
      } catch (error) {
        console.error(
          `Error fetching missions data :`,
          error.response.status
        );
      }
    }
  } catch (error) {
    console.error("Error reading tokens file:", error);
  }
};
