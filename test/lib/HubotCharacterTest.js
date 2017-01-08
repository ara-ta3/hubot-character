const assert = require('power-assert');
const HubotCharacter = require("../../src/lib/HubotCharacter");

class MockRobot {
    constructor(name) {
        this.name = name;
        this.responds = {};
    }

    respond(regexp, callback) {
        this.responds[regexp] = callback;
    }
}

function mockMessageSender(message, channel, characterName, characterIcon) {
    return Promise.resolve({
        message: message,
        characterName: characterName,
        characterIcon: characterIcon
    });
};

describe("HubotCharacter", () => {
    context("run", () => {
        const robot = new MockRobot("mock");
        const hubotCharacter = new HubotCharacter(robot, [], mockMessageSender);
        hubotCharacter.run();
        it("robot should have 'characters' regexp", () => {
            assert.deepEqual(Object.keys(robot.responds), ["/characters$/i"])
        });
    });

    context("run with characters", () => {
        const characters = [
            {
                "name": "smiley",
                "icon": ":smiley:",
                "respond": "smile",
                "messages": [
                    "hello world {name}",
                ],
                "help": "some helps for this command. if this doesn't exists, help will be blank"
            },
            {
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
        ];
        const robot = new MockRobot("mock");
        const hubotCharacter = new HubotCharacter(
            robot,
            characters,
            mockMessageSender
        );
        hubotCharacter.run();
        it("robot should have some regexp", () => {
            const expected = [
                "/characters$/i",
                "/smile$/i",
                "/laughing$/i"
            ];
            assert.deepEqual(Object.keys(robot.responds), expected)
        });
    });

    context("run with broken characters", () => {
        const characters = [
            {
                "name": "smiley",
                "icon": ":smiley:",
                "respond": "smile",
                "messages": [
                    "hello world {name}",
                ],
                "help": "some helps for this command. if this doesn't exists, help will be blank"
            },
            {
                "this": "is",
                "broken": ":innocent:",
            }
        ];
        const robot = new MockRobot("mock");
        const hubotCharacter = new HubotCharacter(
            robot,
            characters,
            mockMessageSender
        );
        const errors = hubotCharacter.run();
        it("robot should have some regexp", () => {
            assert.deepEqual(Object.keys(robot.responds), [
                "/characters$/i",
                "/smile$/i",
            ])
            assert.deepEqual(errors, [
                {
                    "this": "is",
                    "broken": ":innocent:",
                }
            ]);
        });

    });
});

