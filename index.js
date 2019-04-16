require('dotenv').config()
const { Discord, RichEmbed, Client } = require('discord.js')
const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('message', msg => {
  let perpusRegex = /(\/perpus\s)(\S*)/m
  let swearRegex = /(bangsat|bgzd|asu|goblog|gobs|anj)/m

  if(swearRegex.test(msg.content)) {
    msg.reply('Jangan kasar gitu dong sayang :pepesad:')
  }

  if(perpusRegex.test(msg.content)) {
    let regexResult = perpusRegex.exec(msg.content)
    let videoCode = regexResult[2]

    let embed = new RichEmbed()
      .setTitle(videoCode)
      .setColor(0xFF0000)
      .setDescription('Search result for ' + videoCode)
      .setURL('https://www.google.com/search?q=' + videoCode)
    msg.channel.send(embed)
  }
})
client.login(process.env.TOKEN)
