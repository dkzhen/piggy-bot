const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.mission = async () => {
  try {
    const token = await validateToken();

    for (const t of token) {
      const task = await axios.get(
        "https://game-domain.blum.codes/api/v1/tasks",
        {
          headers: {
            Authorization: `Bearer ${t.token}`,
          },
        }
      );
      const tasks = task.data;
      const taskNotStarted = tasks.filter(
        (item) =>
          item.status === "NOT_STARTED" && item.type !== "PROGRESS_TARGET"
      );

      if (taskNotStarted.length > 0) {
        for (const task of taskNotStarted) {
          try {
            const start = await axios.post(
              `https://game-domain.blum.codes/api/v1/tasks/${task.id}/start`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${t.token}`,
                },
              }
            );
            console.log(start.data);
          } catch (error) {
            console.log(error.message);
          }
        }
      } else {
        console.log("No task not started");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.claimMission = async () => {
  try {
    const token = await validateToken();

    for (const t of token) {
      const task = await axios.get(
        "https://game-domain.blum.codes/api/v1/tasks",
        {
          headers: {
            Authorization: `Bearer ${t.token}`,
          },
        }
      );
      const tasks = task.data;
      const taskReadyToClaim = tasks.filter(
        (item) =>
          item.status === "READY_FOR_CLAIM" && item.type !== "PROGRESS_TARGET"
      );

      if (taskReadyToClaim.length > 0) {
        for (const task of taskReadyToClaim) {
          try {
            const claim = await axios.post(
              `https://game-domain.blum.codes/api/v1/tasks/${task.id}/claim`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${t.token}`,
                },
              }
            );
            console.log(claim.data);
          } catch (error) {
            console.log(error.message);
          }
        }
      } else {
        console.log("No task ready to claim");
      }
    }
  } catch (error) {
    console.log("Error on claim mission: ", error.message);
  }
};
