const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.initTask = async () => {
  try {
    const tokens = await validateToken();
    const taskID = [1001, 1002, 1003, 1004, 1005, 1006, 9002];

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

      const mapTask = info.data.data.mapTask || {};

      // Check if all tasks in taskID are already in mapTask
      const missingTasks = taskID.filter((id) => !mapTask[id]);

      if (missingTasks.length > 0) {
        for (const id of missingTasks) {
          const result = await axios.post(
            "https://api.prod.piggypiggy.io/game/TakeTask",
            { TaskID: id, PlayerID: 0 },
            {
              headers: {
                Authorization: `bearer ${token.token}`,
              },
            }
          );
          console.log(result.data);
          console.log(`[ Running ] : Take task ${id} successfully.`);
          console.log(`[ BOT ] : Wait 60 seconds to complete task...`);
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
        console.log(`[ BOT ] : All tasks are already present.`);
      }

      console.log(`[ BOT ] : Info mission`);
      taskID.forEach((id) => {
        const taskInfo = mapTask[id] || {};
        console.log(
          `[ BOT ] : taskID : ${taskInfo.taskID || id} - Completed : ${
            taskInfo.compeleteCount || 0
          }/${taskInfo.taskID === 9002 ? 1 : taskInfo.taskID ? 5 : 0}`
        );
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
