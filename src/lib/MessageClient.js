"use strict"

const format    = require("string-template");

class MessageClient {
    constructor(messageSender, character) {
        this.messageSender = messageSender;
        this.character = character;
        this.cache = "";
    }

    postMessage(channel, speakerName) {
        const selectedOnceBefore = this.cache;
        const messages = (this.character.messages.length > 1 && selectedOnceBefore) ?
            this.character.messages.filter((m) => m !== selectedOnceBefore) :
            this.character.messages;
        const selected = random(messages);
        this.cache = selected
        if( typeof selected === "object" ) {
            return this.postMultiMessage(selected, channel, speakerName);
        }
        const message = format(selected, {
            "name": speakerName
        });
        return this.messageSender(message, channel, this.character.name, this.character.icon);
    }

    postMultiMessage(messages, channel, speakerName) {
        return messages.map((setting) => {
            const message = format(setting.message, {
                "name": speakerName
            });
            return this.messageSender(message, channel, setting.name, setting.icon);
        });
    }
}

function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}

module.exports = MessageClient;
