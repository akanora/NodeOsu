const link = require("../jsons/links.json")

let api = require('../osuapi.js');

module.exports = {
    name: 'recent',
    aliases: ['r', 'rs'],
    cooldown: 2.5,
    description: 'recent!',
    args: false,
    usage: '<nickname>',
    guildOnly: true,
    permissions: false,
    execute(message, args){
        //my stupid way to get username
        try {
            if (!args[0]) {
                username = link[message.author.id].nick
            } else if (args[0].length > 20) {
                let mention = message.mentions.users.first();
                username = link[mention.id].nick
            } else {
                username = args[0]
            }
        } catch {
            return message.channel.send("Please link yourself. **!link <nick>**")
        }
        api.get_user_recent(username).then(getuser => {
            api.get_pp(getuser[0]["beatmap_id"], getuser[0]["maxcombo"], getuser[0]["count50"], getuser[0]["count100"], getuser[0]["count300"], getuser[0]["countmiss"], getuser[0]["countkatu"], getuser[0]["countgeki"], getuser[0]["perfect"], getuser[0]["enabled_mods"])
            .then(function(result){
                message.channel.send(result)
                console.log(getuser[0])
            })
        }).catch(err => {
            return message.channel.send("Something went wrong.. Please specify a correct nickname.")
        });
    },
};