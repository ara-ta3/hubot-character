const assert = require('power-assert');
const MessageClient = require("../../src/lib/MessageClient");

describe("MessageClient", () => {
    describe("postMessage", () => {
        it("should post message based on character's setting", () => {
            const character = {
                "name": "smiley",
                "icon": ":smiley:",
                "respond": "smile",
                "messages": [
                    "hello world {name}",
                ],
                "help": "some helps for this command. if this doesn't exists, help will be blank"
            };
            const mockMessageSender = (message, channel, characterName, characterIcon) => {
                assert.equal(message, "hello world speaker");
                assert.equal(characterName, "smiley");
                assert.equal(characterIcon, ":smiley:");
            };
            const cli = new MessageClient(mockMessageSender, character);
            cli.postMessage("channel", "speaker");
        });
    });
});
