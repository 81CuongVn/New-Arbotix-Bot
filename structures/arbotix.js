const { Discord, Intents, MessageSelectMenu } = require('discord.js')
var colors = require('colors');
const ms = require("ms");
const discord = require("discord.js");
const fs = require("fs");
const { Client, Collection } = require("discord.js");
const config = require("../config");
const handler = require("../handlers/slash");
const mongoose = require("mongoose");


const { MessageEmbed , MessageMenuOption } =  require("discord.js")

const client = new discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS","GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});

//---mongodb---

const dbOptions ={
  useNewUrlParser:true,
  autoIndex:false,
  useUnifiedTopology:true
}

mongoose.connect(process.env.MONGODB,dbOptions)
mongoose.connection.on("connected",()=>{
 console.log("[MONGODB]: database connnected")

})

//----WELCOME----
const { createCanvas, loadImage, registerFont } = 
client.config = config;

client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.queue = new Map();
client.emoji = require('../emoji.js')
client.colors = require('../colors')


client.on("ready", () => {
  console.log(`${client.user.username}Bot online!`); // Configure if u want
  setInterval(() => {
    const statuses = [
      `${client.guilds.cache.size} servers`,
      `${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()} members`,
      `a!help | /help`,
      "ARBOTIX | HJGAMING"
    ];

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: "WATCHING" });
  }, 10000);
  //It will set status :)
});
//mongo

const db = require("quick.db");

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.queue = new Map();

//["command","events","slash"].forEach(handler => {
 // require(`../handlers/${handler}`)(client);
//});

["test","events"].forEach(handler => {
  require(`../handlers/${handler}`)(client);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = "a!";

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args);
});

//tag
client.on("message", async message => {
  //let prefix = config.prefix;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = "a!";
  
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`Bot Prefix : \`${prefix}\``);
  }
});

//commands



//join


 client.on('guildCreate', guild =>{

    const channelId = '890891716142444547'; //put your channel ID here

    const channel = client.channels.cache.get(channelId); 
     //This Gets The Guild Owner
    if(!channel) return; //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('I Joined A Guild!')
        .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
}); 

//left

client.on('guildDelete', guild =>{
    const channelId = '890891716142444548';//add your channel ID
    const channel = client.channels.cache.get(channelId); //This Gets That Channel
    
    if(!channel) return;  //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('I Left A Guild!')
        .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RED')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
}); 


//autorole

 client.on('guildMemberAdd', member => {

  let Role = db.get(`autorole_${member.guild.id}`)
  if (!Role) return;

  let role = member.guild.roles.cache.get(Role)
  if (!role) return;

  member.roles.add(role);
});

//link

client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`../handlers/${handler}`)(client);
});

//client.categories = fs.readdirSync("./slashCommands/");
//["slashCommands"].forEach(handler => {
    
//require("../handlers/slash")(client);
//});

    

	 




  

//welcome

client.on("message", async message => {
  if (message.content === "a!welcome") {
    client.emit("guildMemberAdd", message.member);
  }

    const prefix = ""

    if (message.content == prefix + "help") {
       
        let option1 = new MessageSelectMenu()
            .setLabel("EMOTE-MANGER")
            .setEmoji("864194660687151154")
            .setValue("Option 1") 
            .setDescription("EMOTE MANGER COMMAND HERE")
            .setDefault()

        
        let option2 = new MessageMenuOption()
            .setLabel("MODERATION")
            .setEmoji("853530935004626954")
            .setDescription("MODERATION COMMAND HERE")
            .setValue("Option 2")
            .setDefault()

        let option3 = new MessageMenuOption()
            .setLabel("FUN COMMAND")
            .setEmoji("849277774580940841")
            .setDescription("FUN COMMAND HERE")
            .setValue("Option 3")
            .setDefault()
      
      let option4 = new MessageMenuOption()
            .setLabel("INFO COMMAND")
            .setEmoji("892352020311330816")
            .setDescription("INFO COMMAND HERE")
            .setValue("Option 4")
            .setDefault()

      let option5 = new MessageMenuOption()
            .setLabel("UTILTY COMMANDS")
            .setEmoji("883954238496051211")
            .setValue("Option 5") 
            .setDescription("UTILTY COMMANDS HERE")
            .setDefault()

      let option6 = new MessageMenuOption()
            .setLabel("SUGGESTION COMMANDS")
            .setEmoji("864194653229678612")
            .setValue("Option 6") 
            .setDescription("SUGGESTION COMMANDS HERE")
            .setDefault()

            
      

        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("My Commands")
            .addOption(option1)
            .addOption(option2)
            .addOption(option3)
            .addOption(option4)
            .addOption(option5)
            .addOption(option6)

            
        let embed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        
          .setFooter("©Arbotix | hjgaming")
                .setTitle("Arbotix Help Command")
          
.setTitle(`Information about the __**${client.user.username}**__`)
        
.setTitle(`**${client.user.username}**`)
          .addField("**__My Features__**",
`>>> **__Help Menu__**, 
✅ ... Overview



🔰 ... Information
🎊 ... Fun Related
❤️ ... Emote Manager
⛔ ... Moderation Related
⚜️ ... Utilty Related
💬 ... Suggestion Related`)
        
      .addField(`**__Bot Creator Information__**`,`>>> 💯 This Bot has been made by:\n[**HJ GAMING**](https://discord.com/users/589154804601716838)・[**Discord**](https://discord.gg/JCNj58X28A)・[**Click here**](https://discord.gg/JCNj58X28A)`)
        
  const row = new MessageActionRow()
       .addComponent(selection)



        let menumsg = await message.channel.send({embed: embed , components: [row]})

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1": 
                  let embed6 = new MessageEmbed()
                  .setTitle("EMOTE-MANGER")
                  .setColor("#FFA07A")
                  
.setFooter("©Arbotix | hjgaming")
                     
                    .setDescription("```a!add-these, a!add, a!big, a!list```")
                    menu.reply.send('', {embed: embed6, ephemeral:true})
                break;
                case "Option 2": 
                   let embed4 = new MessageEmbed()
                   .setTitle("Moderation Commands")
                   .setColor("#FFA07A")
.setFooter("©Arbotix | hjgaming")
                   .setDescription(" a!addrole, a!ban, a!clear, a!kick, a!lock, a!moveall, a!multimoji, a!mute, a!nick, a!nuke, a!react, a!resetwarns, a!roleinfo, a!prefix, a!timelock, a!unban, a!unlock, a!unmute, a!voicekick, a!warn, a!warnings, a!announce, a!ctopic")
                    menu.reply.send('', {embed: embed4, ephemeral:true})
                break;
                case "Option 3": 
                  let embed5 = new MessageEmbed()
                  .setTitle("FUN COMMAND")
                    .setFooter("©Arbotix | hjgaming")
                  .setDescription("a!achievement, a!ascii, a!meme, a!slap, a!triggered, a!captcha, a!beautiful, a!blur, a!card, a!circle, a!delete, a!gay, a!gif, a!grey, a!jail, a!kiss, a!paint, a!math")
                  .setColor("#FFA07A")
                    menu.reply.send('', {embed: embed5, ephemeral:true})
                break;
                  case "Option 4": 
                  let embed7 = new MessageEmbed()
                  .setTitle("INFO COMMAND")
                  .setColor("#FFA07A")
                    .setFooter("©Arbotix | hjgaming")
                  .setDescription("```a!avatar, a!credits, a!help, a!membercount, a!playstore, a!uptime, a!vote, a!allbots, a!badges, a!binfo, a!botinfo, a!bug, a!device, a!ping```")
                    menu.reply.send('', {embed: embed7, ephemeral:true})
                break;
                case "Option 5": 
                  let embed8 = new MessageEmbed()
                  .setTitle("UTILTY COMMANDS")
                  .setColor("#FFA07A")
                    .setFooter("©Arbotix | hjgaming")
                  .setDescription("```a!date, a!feedback, a!serverinfo, a!userinfo, a!invite, a!support, a!link```")
                    menu.reply.send('', {embed: embed8, ephemeral:true})
                break;
                case "Option 6": 
                  let embed9 = new MessageEmbed()
                  .setTitle("SUGGESTION COMMANDS")
                  .setColor("#FFA07A")
                    .setFooter("©Arbotix | hjgaming")
                  .setDescription("```a!setsuggest, a!suggest, a!sreply```")
                    menu.reply.send('', {embed: embed9, ephemeral:true})
                break;
                
            }
          
        }
            

        client.on("clickMenu", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send("Only the user who has run the command can choose, type `a!help` instead", true)
            }
        })
    }


});




let a = "#ff0000";
client.on("guildMemberAdd", async member => {
  let welcomeChannel = db.fetch(`welcome_${member.guild.id}`);
  if (welcomeChannel === null) return;

  let joinMsg = db.fetch(`joinmsg_${member.guild.id}`);
  if (joinMsg === null) {
    db.set(
      `joinmsg_${member.guild.id}`,
      `Welcome {member:mention}! We now have {server:members} member!`
    );
  }

  let newJoinMsg = db.fetch(`joinmsg_${member.guild.id}`);
  let content = newJoinMsg
    .replace(/{member:mention}/g, `<@${member.user.id}>`)
    .replace(/{member:name}/g, `${member.user.username}`)
    .replace(/{member:id}/g, `${member.user.id}`)
    .replace(/{member:tag}/g, `${member.user.tag}`)
    .replace(/{member:createdAt}/g, `${member.user.createdAt}`)
    .replace(/{server:name}/g, `${member.guild.name}`)
    .replace(/{server:members}/g, `${member.guild.members.cache.size}`);

  let welcome = await welcomeCanvas
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(`${member.guild.name}`)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))

    .setColor("border", "#8015EA")
    .setColor("username-box", "#8015EA")
    .setColor("discriminator-box", "#8015EA")
    .setColor("message-box", "#8015EA")
    .setColor("title", "#8015EA")
    .setColor("avatar", "#8015EA")

    .setBackground(
      "https://media.discordapp.net/attachments/743111735178952834/794106546660573184/pexels-photo-114979.png"
    )
    .toAttachment();

  let attachment = new discord.MessageAttachment(
    welcome.toBuffer(),
    "welcome.png"
  ); //attachment  its requir buffer
  member.guild.channels.cache.get(welcomeChannel).send(content, attachment);
});


const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
    client.channels.cache
      .get("814881567125536789")
      .send(
        `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
    //`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
    client.channels.cache
      .get("814881567125536789")
      .send(
        `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
  }
);

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageID} ended! Winners: ${winners
      .map(member => member.user.username)
      .join(", ")}`
  );
  client.channels.cache
    .get("814881567125536789")
    .send(
      `Giveaway #${giveaway.messageID} ended! Winners: ${winners
        .map(member => member.user.username)
        .join(", ")}`
    );
});

client.login(process.env.token);
