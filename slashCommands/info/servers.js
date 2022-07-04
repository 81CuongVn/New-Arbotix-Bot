const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");

module.exports = {
 name: "servers",
 description: "🧭 Display the number of servers I am on",
 usage: "/servers",
 category: "General",

        /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

  
 run: async (client, interaction, args) => {
  try {
   const all_guilds = client.guilds.cache;
   const total_members = all_guilds.reduce((a, g) => a + g.memberCount, 0);
   const total_roles = all_guilds.map((guild) => guild.roles.cache.size).reduce((a, b) => a + b, 0);
   const avernange_members = Math.round(total_members / all_guilds.size);
   const avernange_channels = Math.round(client.channels.cache.size / all_guilds.size);
   const avernange_roles = Math.round(total_roles / all_guilds.size);
   const avernange_voice_channels = Math.round(client.channels.cache.filter((c) => c.type === "GUILD_VOICE").size / all_guilds.size);
   const embed = new MessageEmbed()
    .setTitle(`🔹 I'm on \`${all_guilds.size}\` servers visible to \`${total_members}\` users!`)
    .setDescription(`>>> **All \`${all_guilds.size}\` servers \n • \`${total_members}\` members\n • \`${client.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}\` text channels\n • \`${client.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}\` voice channels\n • \`${total_roles}\` roles\n\nThis is an average of: \n • \`${avernange_members}\` members per server\n • \`${avernange_channels}\` text channels per server\n• \`${avernange_voice_channels}\` voice channels per server\n• \`${avernange_roles}\` roles per server\n**`)
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    //.setImage("https://media.discordapp.net/attachments/710425657003212810/884064564034023454/Screenshot_2021-09-05-15-16-44-22_7c6675ada7b05a8d2d5c5ffa2a487337.jpg")
    .setColor("#FFF500")
    .setTimestamp();
   const row = new MessageActionRow()
    .addComponents(
     new MessageButton()
      .setURL("https://discord.com/oauth2/authorize?client_id=984159878123765761&permissions=8&scope=applications.commands%20bot")
      .setEmoji("➕")
      .setLabel("Invite me!")
      .setStyle("LINK")
    );
   interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
  }
 },
};