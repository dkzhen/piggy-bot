# cowtopia-bot

cowtopia-bot is a Telegram automation tool designed to help you manage and interact with [cowtopia bot](https://t.me/cowtopiabot/app?startapp=1370196228).

<p align="center">
  <img src="public/cowtopia.png" alt="cowtopia" width="300"/>
</p>

### Features

- Auto claim Offline Rewards
- Auto claim Hourly mission
- Auto buy animal
- Auto buy factory
- support multi account

### How to use

this bot running on my vps you can add your token authorization

- open the bot [Group Organizer](https://t.me/GroupOrganizer_Bot)
- send command `/start`
- send command `/add`
- select cowtopia-bot
- and send your token authorization (start with `ey...`)

OR you can clone repository and add your token authorization

- Clone repository

```bash
git clone https://github.com/singsing-ruby-bot/cowtopia-bot.git
```

- add config.json on folder configs

```json
[
  {
    "token": "eyJh"
  },
  {
    "token": "eyJh"
  }
]
```

- install modules

```bash
npm install
```

- running script

```bash
npm run start
```

[ WARNING ] this bot in development stage, if bot error you can try again. some error or bug will be fixed.

### Token authorization

You can found on inspact element [F12] from telegram web. open the bot and see [ `on Headers Authorization from api request from cowtopia` ]

- `Authorization: eyJ..`

- example Authorization

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRfYWRkcmVzcyI6IjB4ZkM3NEQzMkY3NzZBNDY5NzQ2ODA5MmI3ZmUzYzRjMDk4ODIzNTk3OSIsInVzZXJfaWQiOiI2NjcyNWJjMTQzNDRhZTJmMWEwNDdmZjUiLCJ0Z19pZCI6IjE0OTMyMzExMTUiLCJ1c2VybmFtZSI6IjE0OTMyMzExMTUiLCJpYXQiOjE3MjA1MTQ2MjAsImV4cCI6MTcyMTExOTQyMH0.1AE50yLVEw_Eda1NbpvyojhQ0oLq4hm8vJEAXKx8zMA"
```

### Contact

You can contact me for more information or report an issue.

- [GitHub](https://github.com/dkzhen)

- [Telegram](https://t.me/dk_zhen2)
