const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "blur",
    description: "blur image",

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

        const image = await Canvas.blur(avatar);
        const attachment = new MessageAttachment(image, "blur.png");

        interaction.followUp({
            files: [attachment]
        }).catch(() => {});
    },
};