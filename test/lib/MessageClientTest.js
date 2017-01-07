const assert = require('power-assert');
const MessageClient = require("../../src/lib/MessageClient");

function mockMessageSender(message, channel, characterName, characterIcon) {
    return Promise.resolve({
        message: message,
        characterName: characterName,
        characterIcon: characterIcon
    });
};

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
            const cli = new MessageClient(mockMessageSender, character);
            return cli.postMessage("channel", "speaker").then((actual) => {
                assert.deepEqual(actual, {
                    message: "hello world speaker",
                    characterName: "smiley",
                    characterIcon: ":smiley:"
                });
            });
        });

        it("should post multiple message based on character's setting", () => {
            const character = {
                "name": "laughing",
                "icon": ":laughing:",
                "respond": "laughing",
                "messages": [
                    [
                        {
                            "name": "laughing",
                            "icon": ":laughing:",
                            "message": "hello world {name}"
                        },
                        {
                            "name": "innocent",
                            "icon": ":innocent:",
                            "message": "good bye {name}"
                        }
                    ]
                ]
            }
            const cli = new MessageClient(mockMessageSender, character);
            return cli.postMessage("channel", "speaker").then((actual) => {
                assert.deepEqual(actual, [
                    {
                        message: "hello world speaker",
                        characterName: "laughing",
                        characterIcon: ":laughing:"
                    },
                    {
                        message: "good bye speaker",
                        characterName: "innocent",
                        characterIcon: ":innocent:"
                    }
                ]);
            });
        });
    });
});
