const discord = require("discord.js");
module.exports = {
  name: "vote",
  category: "🤖 Information Commands",
  discription: "vote on top.gg",
      usage: "vote",

  run: async (client, message, args) => {
    const embed = new discord.MessageEmbed()

      //ok
      .setColor("ff1000")
      .addField("<a:DS_crown2:840137047423320064> Vote my bot <a:DS_crown2:840137047423320064>","[Click here](https://top.gg/bot/984276280423886888/vote/)")

      .setThumbnail("")
      .setImage("")

      .setFooter(
        `REQUESTED BY ${message.author.tag}`,
        `${message.author.displayAvatarURL({ dynamic: true })}`
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed]});
  }
};
