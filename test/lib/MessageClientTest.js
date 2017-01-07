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
                return {
                    message: message,
                    characterName: characterName,
                    characterIcon: characterIcon
                };
            };
            const cli = new MessageClient(mockMessageSender, character);
            const actual = cli.postMessage("channel", "speaker");
            assert.deepEqual(actual, {
                message: "hello world speaker",
                characterName: "smiley",
                characterIcon: ":smiley:"
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
            const mockMessageSender = (message, channel, characterName, characterIcon) => {
                return {
                    message: message,
                    characterName: characterName,
                    characterIcon: characterIcon
                };
            };
            const cli = new MessageClient(mockMessageSender, character);
            const actual = cli.postMessage("channel", "speaker");
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
