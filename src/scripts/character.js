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
const slackAPIToken = process.env.HUBOT_SLACK_TOKEN

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
        config  = initConfig(process.env.HUBOT_CHARACTER_CONFIG);
        slack   = initSlackAPI(slackAPIToken);
        characters = config.characters;
    } catch (e) {
        robot.logger.error(e);
    }

    robot.respond(/characters$/i, (res) => {
        const commands = characters.map((c) => {
            const help = c.help || "";
            return `${robot.name} ${c.respond} - ${help}`
        });
        res.send(commands.join("\n"));
    });
    const cache = {};
    characters.forEach((character) => {
        const r = new RegExp(character.respond + "$", "i");
        robot.respond(r, (res) => {
            const selectedOnceBefore = cache[character.name];
            const messages = (character.message.length > 1 && selectedOnceBefore) ?
                character.messages.filter((m) => m !== selectedOnceBefore) :
                character.messages;
            const selected = res.random(character.messages);
            cache[character.name] = selected
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
