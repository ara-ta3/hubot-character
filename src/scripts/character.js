// Description:
//   misc
//
// Commands:
//   hubot characters 
//

"use strict"
const fs        = require("fs");
const format    = require("string-template");
const slackAPI  = require('slackbotapi');
const confPath  = process.env.HUBOT_CHARACTER_CONFIG
const config    = require(fs.realpathSync(confPath));
const slackAPIToken = process.env.HUBOT_SLACK_TOKEN
const characters    = config.characters;
function initSlackAPI(token) {
    if ( token === undefined ) {
        return new Error(`HUBOT_SLACK_TOKEN cannot be empty! value: undefined`);
    }
    return new slackAPI({
        'token': token,
        'logging': false,
        'autoReconnect': true
    });
};

module.exports = (robot) => {
    const slack = initSlackAPI(slackAPIToken);
    characters.forEach((character) => {
        const r = new RegExp(character.respond + "$", "i");
        robot.respond(r, (res) => {
            const selected = res.random(character.messages);
            const message = format(selected, {
                "name": res.message.user.name
            });
            const c = res.message.rawMessage.channel;
            slack.reqAPI("chat.postMessage", {
                channel: c,
                text: message,
                username: character.name,
                link_names: 0,
                pretty: 1,
                icon_emoji: character.icon
            }, (res) => {
                if(!res.ok) {
                    robot.logger.error(`something ocuured ${res}`);
                    return;
                }
            })
        })
    });
}
