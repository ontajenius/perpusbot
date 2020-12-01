require("dotenv").config();
const { Client, RichEmbed } = require("discord.js");
const client = new Client();
const _badWord = [
  "Anjing",
  "Babi",
  "Kunyuk",
  "Bangsat",
  "Bajingan",
  "Asu",
  "Bangsat",
  "Kampret",
  "Kontol",
  "Memek",
  "Ngentot",
  "Pentil",
  "Perek",
  "Pepek",
  "Pecun",
  "Bencong",
  "Banci",
  "Maho",
  "Gila",
  "Sinting",
  "Tolol",
  "Sarap",
  "Setan",
  "Lonte",
  "Hencet",
  "Taptei",
  "Kampang",
  "Pilat",
  "Keparat",
  "Bejad",
  "Gembel",
  "Brengsek",
  "Tai",
  "Anjrit",
  "Bangsat",
  "Fuck",
  "Tetek",
  "Ngulum",
  "Jembut",
  "Totong",
  "Kolop",
  "Pukimak",
  "Bodat",
  "Heang",
  "Jancuk",
  "Burit",
  "Titit",
  "Nenen",
  "Bejat",
  "Silit",
  "Sempak",
  "Fucking",
  "Asshole",
  "Bitch",
  "Penis",
  "Vagina",
  "Klitoris",
  "Kelentit",
  "Borjong",
  "Dancuk",
  "Pantek",
  "Taek",
  "Itil",
  "Teho",
  "Bejat",
  "Pantat",
  "Bagudung",
  "Babami",
  "Kanciang",
  "Bungul",
  "Idiot",
  "Kimak",
  "Henceut",
  "Kacuk",
  "Blowjob",
  "Pussy",
  "Dick",
  "Damn",
  "Ass",
];
const _wotaWord = ["Jkt48", "jeketi", "jekate", "anin", "jkt", "theater"];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageDelete", (msg) => {
  try {
    const id = msg.author.id;
    msg.channel.send(`Hayo <@${id}> kamu hapus apaan?`);
    if (msg.attachments.size > 0) {
      const attachments = msg.attachments.array();
      for (const attachment of attachments) {
        const repost = new RichEmbed()
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
          .setImage(attachment.url)
          .setTimestamp()
          .setFooter("Foto yang dihapus")
          .setDescription(`Pesan yg dihapus: ${msg.content}`);
        msg.channel.send(repost);
      }
    } else {
      msg.channel.send(`Yang dihapus: ${msg.content}`);
    }
  } catch (error) {
    console.log(`Sender: ${msg.author.username}, Message: ${messageString}`);
    console.log(`Error: ${error}`);
  }
});

client.on("message", (msg) => {
  try {
    const isBot = msg.author.bot;
    const id = msg.author.id;
    if (!isBot) {
      const messageString = msg.content.toLowerCase();

      if (_badWord.some((word) => messageString.includes(word.toLowerCase()))) {
        msg.channel.send(`Jangan kasar gitu dong sayang <@${id}> :frowning:`);
      }

      if (
        _wotaWord.some((word) => messageString.includes(word.toLowerCase()))
      ) {
        msg.channel.send(`Wota si <@${id}> anjir :rofl:`);
      }

      if (messageString.includes("lantas")) {
        msg.channel.send(`Jangan lantas mulu <@${id}> bangsat :rage:`);
      }
    }
  } catch (error) {
    console.log(`Sender: ${msg.author.username}, Message: ${messageString}`);
    console.log(`Error: ${error}`);
  }
});
client.login(process.env.TOKEN_MENANGOS);
