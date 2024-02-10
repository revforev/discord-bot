const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('hi').setDescription('Replies with hello!'),
  async execute(interaction) {
    await interaction.reply('Hello there!');
  },
};
