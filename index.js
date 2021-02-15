require("dotenv").config();
const { RichEmbed, Client } = require("discord.js");
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

client.on("message", (msg) => {
  try {
    const isBot = msg.author.bot;
    const id = msg.author.id;
    let perpusRegex = /(\/perpus\s)(\S*)/m;

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

      if (perpusRegex.test(msg.content)) {
        let regexResult = perpusRegex.exec(msg.content);
        let videoCode = regexResult && regexResult.length > 0 ? regexResult[2] : "";
        let codeRegex = /([a-zA-z]{3,4}-\d{3,4})/;
        if (codeRegex.test(videoCode)) {
          const imageUrl = videoCode.replace("-", "");
          let embed = new RichEmbed()
            .setTitle(videoCode)
            .setColor(0xff0000)
            .setDescription("Search result for " + videoCode)
            .setURL(
              `https://www.javlibrary.com/en/vl_searchbyid.php?keyword=${videoCode}`
            )
            .setThumbnail(
              `https://pics.dmm.co.jp/mono/movie/adult/${imageUrl}/${imageUrl}pl.jpg`
            );
          msg.channel.send(embed);
        } else {
          msg.channel.send(`Salah code nya bang <@${msg.author.id}>`);
        }
      }
    }
  } catch (err) {
    console.log(`Sender: ${msg.author.username}, Message: ${msg.content}`);
    console.log(`Error: ${err}`);
  }
});
client.login(process.env.TOKEN_DW);
