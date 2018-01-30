
const Discord = require("discord.js");

const TOKEN = "PUT YOUR TOKEN HERE";

const PREFIX = "+";

const bot = new Discord.Client();

var annoyed = 0;

var canRes = [
    "Yes!",
    "Yep.",
    "No.",
    "No!",
    "NO NO NO NO",
    "Maybe",
    "If I try",
    "I could...",
    "I don't know how...",
    "I'm kinda busy right now",
    "sure",
    "Can you stop?",
    "... no.",
    ";)"

];
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'theory-hall');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`  + ", I'm Kitsune. Nice to meet you!");
    annoyed = 0;
  });

bot.on("ready", function(){
    console.log("ready Kitsune");
});

bot.on("message", function(message) {    
    if(message.author.equals(bot.user)) return;

    annoyed -= 1;

    if(!message.content.startsWith(PREFIX)) return;

    annoyed += 2;

    if(annoyed > 10){ 
        message.channel.send("Leave me alone :(")    
        return
    }
    
    var args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0].toLowerCase()) {      
        case "ping":
            message.channel.send("Pong!");
            break;
        case "f":
            message.reply("has paid their respects");
            break;
        case "can":
            if(args[1]){
                message.channel.send(canRes[
                        Math.floor(Math.random() * 
                        canRes.length)
                    ])
            }else{
                    message.channel.send("Can I... what?");
            }
            break;
        case "slap":
            if(args[1]){
                message.channel.send("*smack " + args[1].toString() + "*")
            }else{
                    message.channel.send("Slap who?");
            }
            break;
        case "cs":
            var embed = new Discord.RichEmbed()
            .setThumbnail(message.author.avatarURL)
            .setTitle("My Hero")
            .addField("HP", "12/12", true)
            .addField("AC", "15", true)
            .setColor(230,230,120)
            .setFooter("IN PROGRESS")
            
            message.channel.send(embed);
            break;
        case "noticeme":
            message.channel.send("I notice you " + message.author.toString() + " <3");
            break;
        case "rol":
            message.channel.send("Did you mean roll?\n")
        case "roll":
            var die;
            for(j = 1; j < args.length; j++){
                die = args[j].toLowerCase();
                var values = die.split("d");
                if(values.length != 2) break;
                var left = parseInt(values[0]);
                var right = parseInt(values[1]);
                var temp = 0;
                var before = "";
                var after = "";
                var natural = "";
                if(!( isNaN(left) || isNaN(right) )){
                    for(i = 0; i < left; i++){
                        temp += Math.floor(Math.random() * right) + 1;
                    }
                    if(right + left >= 6){
                        if(temp < (right * left)/4){
                            before = "Oh No!\nDon't blame me but you ";
                        }
                        if(temp > (right * left) - (right * left)/4){
                            before = "You";
                            after = ", that's pretty good";
                        }
                        if(right == 20 && left == 1){
                            if(temp == 20 || temp == 1) natural = "natural ";
                            if(temp == 20) after = " Yay :3";
                            if(temp == 1) after = "\nI'm sorry.";
                       }
                    }
                    message.reply(before + " rolled a " + natural + temp + after);
                }
            }
            break;
        case "hap":
        case "hel":
        case "hlp":
        case "halp":
            message.reply("Did you mean help?\n")
        case "help":
            message.channel.send("+help\n+f \n+can you... (ask me anything ;)\n+ping\n+noticeme\n+cs\n+slap ___\n+roll _d_ _d_... roll up to 10!\n")
             break;
        default:
            message.channel.send("I don't..., what?");
            break;
    }

});

bot.login(TOKEN);
