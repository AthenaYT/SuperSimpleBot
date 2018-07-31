const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment');
require('moment-duration-format');
const enmap = require('enmap');
const EnmapLevel = require('enmap-level');
require('./package.json');

const Webhook = require('webhook-discord')
const Hook = new Webhook(process.env.W)

client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.channels.get("welcome").send(`"${member.user.username}" has joined this server`);
});

client.on('ready', () => {
  client.user.setActivity(`with mommy and daddy`)
  console.log('Logged In As ' + client.user.tag)
  Hook.info('Shard Updates', `Shard ${client.shard.id} Is Connecting...`)
});

client.on('reconnecting', () => {
  Hook.info('Shard Updates', `Shard ${client.shard.id} Is Reconnecting...`)
});

client.on('disconnect', () => {
  Hook.info('Shard Updates', `Shard ${client.shard.id} Has Disconnected...`)
});


client.on('message', async message => {
  const duration = moment.duration(client.uptime).format(" D [Days], H [Hours], m [Minutes], s [Seconds]");
  const args = message.content.split(' ').slice(1);

  if (message.content.startsWith(config.prefix + 'eval')) { //This one was not closed
  
// cnst Command = require('../base/command.js');
const { RichEmbed } = require('discord.js')
        const notDev = new RichEmbed()
            .setColor('RED')
            .setTitle(`$This command can only be ran by the bot developer.`);
        if (message.author.id !== '470080379663941633') return message.delete(), message.channel.send(notDev)
        if (!args[0]) return;
        let flag;
        if (message.content.includes('--')) {
            flag = message.content.split('--')[1];
        } else { 
            flag = null 
        };
        if (flag === null) {
            const content = message.content.split(' ').slice(1).join(' ');
            const result = new Promise((resolve, reject) => resolve(eval(content)));
            return result.then(async output => {
                if (typeof output !== 'string') output = require('util').inspect(output, {
                    depth: 0
                });
                if (output.includes(config.token)) output = output.replace(config.token, '[TOKEN]');
                let toolong = new RichEmbed()
                    .setColor("GOLD")
                    .setTitle("Eval Success")
                    .setDescription(`**Length too long, check console.**`)
                if (output.length > 1000) return console.log(output), message.channel.send(toolong);
                let success = new RichEmbed()
                    .setColor("GREEN")
                    .addField(`**Eval Success**`, `\`\`\`${output}\`\`\``)
                return message.channel.send(success)
            }).catch(err => {
                console.error(err);
                err = err.toString();

                if (err.includes(config.token)) err = err.replace(config.token, '[TOKEN]');
                let error = new RichEmbed()
                    .setColor("RED")
                    .addField(`**Eval Fail**`, `\`\`\`${err}\`\`\``)
                return message.channel.send(error);
            });
        };
        if (flag.toLowerCase() === 'silent') {
            let content = message.content.split(' ').slice(1).join(' ').split('--')[0];
            const result = new Promise((resolve, reject) => resolve(eval(content)));
            return result.then(async output => {
                if (typeof output !== 'string') output = require('util').inspect(output, {
                    depth: 0
                })
                if (output.includes(config.token)) output = output.replace(config.token, '[TOKEN]');
                let toolong = new RichEmbed()
                    .setColor("GOLD")
                    .setTitle("Eval Success")
                    .setDescription(`**Length too long, check console.**`)
                if (output.length > 1000) return console.log(output), message.channel.send(toolong);
                let success = new RichEmbed()
                    .setColor("GREEN")
                    .addField(`**Eval Success**`, `\`\`\`${output}\`\`\``)
                await message.channel.send(success);
                return message.channel.bulkDelete(1);
            }).catch(err => {
                console.error(err);
                err = err.toString();

                if (err.includes(config.token)) err = err.replace(config.token, '[TOKEN]');
                let error = new RichEmbed()
                    .setColor("RED")
                    .addField(`**Eval Fail**`, `\`\`\`${err}\`\`\``)
                return message.channel.send(error);
            });
            //silent
        };
    };

  if(message.content.startsWith(config.prefix + 'play')) {
    message.member.voiceChannel.join()
  .then(connection => {
    const dispatcher = connection.playFile('./audio.mp3');
  })
  .catch(console.error);
  }
  
});
  // ^

client.login(config.token)


