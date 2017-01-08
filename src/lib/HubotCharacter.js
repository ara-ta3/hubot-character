"use strict"
const MessageClient = require("../lib/MessageClient");

function validCharacter(character) {
    return character.name !== undefined &&
        character.icon !== undefined &&
        character.respond !== undefined &&
        Array.isArray(character.messages);
}

class HubotCharacter {
    constructor(robot, characters, postMessage) {
        this.robot          = robot;
        this.characters     = characters;
        this.postMessage    = postMessage;
    }

    run() {
        this.robot.respond(/characters$/i, (res) => {
            const commands = this.characters.map((c) => {
                const help = c.help || "";
                return `${robot.name} ${c.respond} - ${help}`
            });
            res.send(commands.join("\n"));
        });

        let errors = [];
        this.characters.map(
            (character) => new MessageClient(this.postMessage, character)
        ).forEach((messageClient) => {
            if ( !validCharacter(messageClient.character) ) {
                errors = errors.concat([messageClient.character]);
                return;
            }
            const r = new RegExp(messageClient.character.respond + "$", "i");
            this.robot.respond(r, (res) => {
                const channel = res.message.room;
                const speakerName = res.message.user.name;
                return messageClient.postMessage(channel, speakerName);
            });
        });
        return errors;
    }
}

module.exports = HubotCharacter;
