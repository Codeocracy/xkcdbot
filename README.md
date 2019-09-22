# UDXS XKCD Discord Bot

A simple XKCD discord bot


## Usage
After installation, you can use any of the following commands:
- ### Latest XKCD: `/xkcd latest`
- ### XKCD by its comic number: `/xkcd NUMBER` 
- ### Random XKCD: `/xkcd`

## Installation
### Prerequisites
- [Node.js](https://nodejs.org/)
- A Discord account
- A server where you have moderation capabilities
- Command line and administrator(root/sudo) access
- A copy of this project downloaded and, if need be, extracted.

### Steps
1. Open `config.json` and replace `INSERT_TOKEN_HERE` with your bot's token ([Learn how to create the Discord Bot account and get its token here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token))
2. In the same file, replace `INSERT_CHANNEL_ID_HERE` with the channel ID you would like XKCD's to be delivered to. **If you would like to not receive XKCD's when they appear**, clear out the contents within the quotations so the line looks like this: `"channel": ""`.
3. In your command line, run `npm install` while in the XKCD bot folder.
4. Run `node xkcdbot.js` or `nodejs xkcdbot.js`. You may need to run it with `sudo` on certain systems.
5. Join the bot to your server with the URL ([Learn how to add a Discord bot to your server](https://github.com/jagrosh/MusicBot/wiki/Adding-Your-Bot-To-Your-Server))

## Notice
UDXS XKCDbot is distributed under the MIT license (available in `LICENSE`). Check the licenses of its NPM dependencies for more information.

XKCD is created of Randall Monroe and is available on [XKCD.com](https://xkcd.com). It is licensed under [CC BY-NC 2.5](https://creativecommons.org/licenses/by-nc/2.5/).
