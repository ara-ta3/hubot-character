// Description:
//   misc
//
// Commands:
//   hubot characters
//

"use strict"
const fs        = require("fs");
const slackAPI  = require('slackbotapi');
const slackAPIToken = process.env.HUBOT_SLACK_TOKEN;
const characterConfigPath = process.env.HUBOT_CHARACTER_CONFIG;
const HubotCharacter = require("../lib/HubotCharacter");

function initConfig(confPath) {
    if ( confPath === undefined ) {
        throw new Error("HUBOT_CHARACTER_CONFIG cannot be empty! value: undefined");
    }
    const config = require(fs.realpathSync(confPath));
    return config;
};

function initSlackAPI(token) {
    if ( token === undefined ) {
        throw new Error(`HUBOT_SLACK_TOKEN cannot be empty! value: undefined`);
    }
    return new slackAPI({
        'token': token,
        'logging': false,
        'autoReconnect': true
    });
};

module.exports = (robot) => {
    let config;
    let slack;
    let characters = [];
    try {
        robot.logger.info(`Load ${characterConfigPath} as character config.`);
        config  = initConfig(characterConfigPath);
        slack   = initSlackAPI(slackAPIToken);
        characters = config.characters;
    } catch (e) {
        robot.logger.error(e.toString());
    }

    function postMessageWithSlack(message, channel, userName, icon) {
        return new Promise((resolve, reject) => {
            slack.reqAPI("chat.postMessage", {
                channel: channel,
                text: message,
                username: userName,
                link_names: 0,
                pretty: 1,
                icon_emoji: icon
            }, (res) => {
                if(!res.ok) {
                    robot.logger.error(`something occured with slack api. ${res.error}`);
                    reject(new Error(`something occured with slack api. ${res.error}`));
                }
                resolve();
            })
        });
    }
    const hubotCharacter = new HubotCharacter(robot, characters, postMessageWithSlack)
    const errors = hubotCharacter.run();
    if (errors.length > 0) {
        robot.logger.warning("some character settings has invalid format");
        robot.logger.warning("The object keys of 'name, icon, (respond or hear), messages' are required and the value of 'messages' must be array");
        robot.logger.warning(`Invalid settings: ${JSON.stringify(errors)}`);
    }
}
