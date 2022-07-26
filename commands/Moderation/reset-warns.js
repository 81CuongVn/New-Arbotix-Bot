const db = require("quick.db");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  usage: "rwarns <@user>",
  description: "Reset warnings of mentioned person",
  category: "⛔️ moderation",

  run: async (client, message, args) => {
    		const GuildMember = message.member;
        if(!GuildMember.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** You need **ADMINISTRATOR** premission`, });

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send({

          content: `:crossed_swords: **${message.member.user.username}** Mention user`
        
      });
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send({

          content: `:crossed_swords: **${message.member.user.username}** Mention user is bot`
        
      });
    }

    if (message.author.id === user.id) {
      return message.channel.send({

          content: `:crossed_swords: **${message.member.user.username}** You Can't reset own warnings`
        
      });
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(
        `${message.mentions.users.first().username} do not have any warnings now`
      );
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(
      `Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`
    );
    await message.channel.send(
      `Reseted all warnings of **${message.mentions.users.first().username}**`
    );
  }
};
