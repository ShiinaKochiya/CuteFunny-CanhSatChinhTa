/** @format */

//console.clear();

const { Permissions, MessageEmbed } = require('discord.js');

const Client = require("./structures/Client.js");

const Command = require("./structures/Command.js");

const config = require("./data/config.json");

const client = new Client();

const axios = require('axios');

const dict = require(`./data/chinhta.json`);
require('dotenv').config();

client.on("ready", async () => {
	client.user.setStatus('idle');
    client.user.setActivity({type: `WATCHING`, name:`Chính tả`})
	console.log(`Started`);
});


client.on("messageCreate", message => {
	if (message.author.bot) return;

	let content = message.content;

	Object.entries(dict).forEach(([paramName, words]) => {
		words.forEach((word) => {
			const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const pattern = new RegExp(`(^|\\s)${escapedWord}(?=\\s|$)`, 'gi');
			content = content.replace(pattern, (match, prefix) => `${prefix}${paramName}`);
		});
	});

	if (content !== message.content) {
		message.channel.send(content);
	}
});

// let scheduledMessage = new cron.CronJob('* * * 14 4 *', () => {
//	client.channels.cache.get('A_channel_ID_go_here').send('Its my birthday today UwU')
// });

// scheduledMessage.start()


client.login(config.token);


