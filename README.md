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
        }
    ]
}
```

At here, hubot's name is "dark".  

![image](https://raw.githubusercontent.com/ara-ta3/hubot-character/images/hubot-character-screenshot-01.png)
