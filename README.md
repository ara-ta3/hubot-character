# hubot-character

# Install

```
$npm install --save hubot-character
# edit external-scripts.json
$cat 
[
"hubot-character"
]
# edit config.json. also see config.sample.json
$cat config.json
{
    "characters": [
        {
            "name": "smiley",
            "icon": ":smiley:",
            "respond": "smile",
            "messages": [
                "hello world {name}"
            ]
        }
    ]
}
```

# Settings

## Environment variables

- HUBOT_CHARACTER_CONFIG
  - required
  - `config.json`'s path
- HUBOT_SLACK_TOKEN
  - required
  - your slack team's api token to reply with the character's message

## config.json

```
{
    "characters": [
        {
            "name": "the bot name",
            "icon": "slack icon for showing the bot's icon",
            "respond": "regular expression for the bot to respond",
            "messages": [
                "messages the bot will replay to you",
                "you can use the macro {name}.",
                "ex 'hello world {name}'",
                [
                    {
                        "name": "the bot name. this overrides the bot's name",
                        "icon": "the bot's icon this also overrides the bot's icon",
                        "message": "message the bot will reply to you"
                    },
                    {
                        "name": "...",
                        "icon": "...",
                        "message": "this is the message too. this is posted at a time with the above message."
                    }
                ]
            ]
        }
    ]
}
```

If your setting is something like the below, the bot's response will be like the picture.  

```
{
    "characters": [
        {
            "name": "smiley",
            "icon": ":smiley:",
            "respond": "smile",
            "messages": [
                "hello world {name}",
                "what's up {name}"
            ]
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
    ]
}
```

* hubot's name is "dark" here.  

![image](https://raw.githubusercontent.com/ara-ta3/hubot-character/image/hubot-character-screenshot-01.png)

