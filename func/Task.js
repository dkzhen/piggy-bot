const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.Task = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const info = await axios.post(
        "https://api.prod.piggypiggy.io/game/GetDailyTaskInfo",
        {
          PlayerID: 0,
        },
        {
          headers: {
            Authorization: `bearer ${token.token}`,
          },
        }
      );
      const taskID = [1001, 1002, 1003, 1004, 1005, 1006, 9002];
      const compeleteCount = [2, 5, 8, 8, 5, 5, 1];

      let availableTaskID = [];

      for (let i = 0; i < taskID.length; i++) {
        if (
          info.data.data.mapTask[taskID[i]].compeleteCount < compeleteCount[i]
        ) {
          availableTaskID.push(taskID[i]);
        }
      }
      if (availableTaskID.length > 0) {
        for (const id of availableTaskID) {
          await axios.post(
            "https://api.prod.piggypiggy.io/game/TakeTask",
            { TaskID: id, PlayerID: 0 },
            {
              headers: {
                Authorization: `bearer ${token.token}`,
              },
            }
          );
          console.log(`[ Running ] : Take task ${id} successfully.`);
          console.log(`[ BOT ] : Wait 60 second to completed task...`);
          await new Promise((resolve) => setTimeout(resolve, 60000));
          await axios.post(
            "https://api.prod.piggypiggy.io/game/CompleteTask",
            { TaskID: id, PlayerID: 0 },
            {
              headers: {
                Authorization: `bearer ${token.token}`,
              },
            }
          );
          console.log(`[ Completed ] : Task ${id} successfully.`);
        }
      } else {
        console.log(`[ Completed ] : No task available.`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
