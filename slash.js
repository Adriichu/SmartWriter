const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const { ClientID, Token } = require('./config.json');
const fs = require('node:fs');

const commands = [
	{ name: 'help', description: 'Displays everything the bot has to offer.'},
    { name: 'ping', description: "Replies with the bot's ping." },
    { name: 'rephrase', description: 'Scans your text for grammar and syntax errors.', options: [ { name: 'rephrase', description: 'What would you like me to rewrite?', type: 3, required: true } ]},
	{ name: 'synonym', description: 'Finds synonymous words.', options: [ { name: 'synonym', description: 'What word would you like me to find synonyms for?', type: 3, required: true } ]},
	{ name: 'antonym', description: 'Finds antonymous words.', options: [ { name: 'antonym', description: 'What word would you like me to find antonyms for?', type: 3, required: true } ]},
];

const rest = new REST({ version: '10' }).setToken(Token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
            Routes.applicationCommands(ClientID),
            { body: commands },
        );
        

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
