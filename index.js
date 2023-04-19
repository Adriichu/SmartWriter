const Discord = require('discord.js')
const Client = new Discord.Client({ intents: "32767" })
const { Token, apiKey } = require('./config.json')
const { Configuration, OpenAIApi } = require('openai')

Client.on('ready', async () => {
    console.log(`${Client.user.tag} is now online.`)
})

const configuration = new Configuration({
    apiKey: apiKey
})

const openai = new OpenAIApi(configuration)

Client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {

        if (interaction.commandName === 'help') {
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId('rephrase')
                    .setEmoji("<:icons_list:1084845813856997446>")
                    .setLabel("Paraphrasing")
                    .setStyle(Discord.ButtonStyle.Success)
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("<:icons_share:1084145568818933771>")
                        .setLabel('Invite Bot')
                        .setURL('https://discord.com/api/')
                        .setStyle(Discord.ButtonStyle.Link)
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("<:icons_link:1084145529384087622>")
                        .setLabel('Support Server')
                        .setURL('https://discord.gg/')
                        .setStyle(Discord.ButtonStyle.Link)
                )

                const row2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("<:icons_share:1084145568818933771>")
                        .setLabel('Invite Bot')
                        .setURL('https://discord.com/api/')
                        .setStyle(Discord.ButtonStyle.Link)
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("<:icons_link:1084145529384087622>")
                        .setLabel('Support Server')
                        .setURL('https://discord.gg/')
                        .setStyle(Discord.ButtonStyle.Link)
                )

            const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: 'SmartWriter', iconURL: `${Client.user.avatarURL()}` })
                .setDescription(`**SmartWriter** elevates your writing by providing text enhancing services powered by AI that take it to the next level.`)
                .addFields(
                    { name: `<:icons_members:1084728901890216016> Currently Serving`, value: `<:text:1084731926889386076> **${Client.guilds.cache.size}** servers`, inline: true },
                    { name: `<:icons_ping:1084733835440304150> Websocket ping`, value: `<:text:1084731926889386076> **${Client.ws.ping}**ms`, inline: true },
                )
                .setColor('#FDFD96')
                .setImage('https://cdn.discordapp.com/attachments/377361676514754572/1084512339514114098/Untitled3.jpg')
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                .setTimestamp()

            const embed2 = new Discord.EmbedBuilder()
            .setAuthor({ name: 'SmartWriter', iconURL: `${Client.user.avatarURL()}` })
            .setDescription(`\`\`\`/rephrase    :: Scans text for grammar and syntax error.\n/synonym     :: Finds synonymous words.\n/antonym     :: Finds antonymous words.\`\`\``)
            .setColor('#FDFD96')
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
            .setTimestamp()

            await interaction.reply({ embeds: [embed], components: [row] })

            const filter = i => i.customId === 'rephrase'
            const filter2 = i2 => i2.customId === 'back' 

            
            const collector = interaction.channel.createMessageComponentCollector({ filter, filter2});

            collector.on('collect', async i => {
                await i.update({ embeds: [embed2], components: [row2]});
            });

        }

        if (interaction.commandName === 'ping') {
            await interaction.reply(`${Client.ws.ping}ms`)
        }

        if (interaction.commandName === 'rephrase') {
            const writing = interaction.options.getString('rephrase')

            await interaction.deferReply()

            try {
                const res = await openai.createCompletion({
                    model: 'text-davinci-003',
                    max_tokens: 2048,
                    temperature: 0.5,
                    prompt: `Rephrase "${writing}"`,
                })

                const embed = new Discord.EmbedBuilder()
                    .setColor('#FDFD96')
                    .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

                await interaction.editReply({ embeds: [embed] })
            } catch (e) {
                console.log(e)
            }
        }

        if (interaction.commandName === 'synonym') {
            const writing = interaction.options.getString('synonym')

            await interaction.deferReply()

            try {
                const res = await openai.createCompletion({
                    model: 'text-davinci-003',
                    max_tokens: 2048,
                    temperature: 0.5,
                    prompt: `Synonyms of "${writing}"`,
                })

                const embed = new Discord.EmbedBuilder()
                    .setColor('#FDFD96')
                    .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

                await interaction.editReply({ embeds: [embed] })
            } catch (e) {
                console.log(e)
            }
        }

        if (interaction.commandName === 'antonym') {
            const writing = interaction.options.getString('antonym')

            await interaction.deferReply()

            try {
                const res = await openai.createCompletion({
                    model: 'text-davinci-003',
                    max_tokens: 2048,
                    temperature: 0.5,
                    prompt: `Antonyms of "${writing}"`,
                })

                const embed = new Discord.EmbedBuilder()
                    .setColor('#FDFD96')
                    .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

                await interaction.editReply({ embeds: [embed] })
            } catch (e) {
                console.log(e)
            }
        }
    }
})

Client.login(Token)