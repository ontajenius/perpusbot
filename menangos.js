require('dotenv').config()
const { Client } = require('discord.js')
const client = new Client()
const _badWord = ['Anjing', 'Goblok', 'Goblog', 'Babi', 'Kunyuk', 'Bajingan', 'Asu', 'Bangsat', 'Kampret', 'Kontol', 'Memek', 'Ngentot', 'Pentil', 'Perek', 'Pepek', 'Pecun', 'Bencong', 'Banci', 'Maho', 'Gila', 'Sinting', 'Tolol', 'Sarap', 'Setan', 'Lonte', 'Hencet', 'Taptei', 'Kampang', 'Pilat', 'Keparat', 'Bejad', 'Gembel', 'Brengsek', 'Tai', 'Anjrit', 'Bangsat', 'Fuck', 'Tetek', 'Ngulum', 'Jembut', 'Totong', 'Kolop', 'Pukimak', 'Bodat', 'Heang', 'Jancuk', 'Burit', 'Titit', 'Nenen', 'Bejat', 'Silit', 'Sempak', 'Fucking', 'Asshole', 'Bitch', 'Penis', 'Vagina', 'Klitoris', 'Kelentit', 'Borjong', 'Dancuk', 'Pantek', 'Taek', 'Itil', 'Teho', 'Bejat', 'Pantat', 'Bagudung', 'Babami', 'Kanciang', 'Bungul', 'Idiot', 'Kimak', 'Henceut', 'Kacuk', 'Blowjob', 'Pussy', 'Dick', 'Damn', 'Ass'];
const _wotaWord = ['JKT48', 'Jeketi', 'Anin', 'HS', 'Handshake']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('message', msg => {
  const isBot = msg.author.bot;
  if (!isBot) {
    try {
      const message = msg.content.toLowerCase();
      console.log(`From: ${msg.author.username}, Message: ${message}`);
      const isBad = _badWord.some(word => message.includes(word.toLowerCase()))
      const isWota = _wotaWord.some(word => message.includes(word.toLowerCase()))

      if (isBad) {
        msg.channel.send(`Jangan kasar gitu dong <@${msg.author.id}> sayang :frowning2:`)
      } else if (isWota) {
        msg.channel.send(`Wota si <@${msg.author.id}> anjir!! :rofl:`)
      } else if (message.includes('juicy')) {
        msg.channel.send(`Jangan juicy luicy mulu dong <@${msg.author.id}> bangsat! :rage:`)
      }

    } catch (err) {
      console.log(err);
    }
  }

})

client.login(process.env.TOKEN)
