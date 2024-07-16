const dotenv = require("dotenv");
const fs = require("fs").promises;
const axios = require("axios");
const { validateToken } = require("./CheckValidToken");
dotenv.config();

const API_URL = "https://cowtopia-be.tonfarmer.com/mission";
const CLAIM_API_URL = "https://cowtopia-be.tonfarmer.com/mission/check";

exports.claimMission = async function () {
  try {
    const tokens = await validateToken();
    // Loop through each token and make a GET request
    for (const token of tokens) {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token.token}`,
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
                  Authorization: `Bearer ${token.token}`,
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
        console.error(`Error fetching missions data :`, error.response.status);
      }
    }
  } catch (error) {
    console.error("Error reading tokens file:", error);
  }
};
