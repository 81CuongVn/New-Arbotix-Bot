const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "delete",
    description: "delete image",

    options: [{
        name: "target",
        description: "select a target",
        type: "USER",
        required: false
    }],

run: async (client, interaction) => {

        const user = interaction.options.getUser('target') || interaction.member;
        const avatar = user.displayAvatarURL({
            format: "png"
        })

        const image = await Canvas.delete(avatar, true);
        const attachment = new MessageAttachment(image, "delete.png");

        interaction.followUp({
            files: [attachment]
        }).catch(() => {});
    },
};