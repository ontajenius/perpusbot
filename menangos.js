require("dotenv").config();
const cron = require('node-cron');
const { format } = require("date-fns");
const { Client, MessageEmbed, Intents } = require("discord.js");
const axios = require("axios").default;
const intents = new Intents(Intents.NON_PRIVILEGED);
intents.add('GUILD_MEMBERS', 'GUILD_MESSAGES');
const client = new Client({ ws: { intents: intents } });

const birthdayList = require('./birthday.json');

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
const perpusRegex = /(\/perpus\s)(\S*)/m;
const codeRegex = /([a-zA-z]{3,4}-\d{3,4})/;
const pictureRegex = /\/\/pics.dmm.co.jp\/mono\/movie\/adult\/\S*.jpg/;

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  sendBirthday();
});

const sendBirthday = async () => {
  const generalChannel = client.channels.cache.find((x) => x.id === '695217479139590180');

  const today = format(new Date(), 'dd-MM');
  const birthdaysToday = birthdayList.filter((data) => data.birthday === today);
  if (birthdaysToday.length > 0) {
    for (const birthday of birthdaysToday) {
      generalChannel.send(`HBD ya sayangku <@${birthday.id}>, semoga panjang umur & sehat selalu :birthday: :partying_face:`);
      generalChannel.send(`Kecup basah dari Ara buat <@${birthday.id}> :kissing_closed_eyes:`);
    }
  }
}

client.on("messageDelete", (msg) => {
  try {
    const id = msg.author?.id;
    msg.channel.send(`Hayo <@${id}> kamu hapus apaan?`);
    if (msg.attachments.size > 0) {
      const attachments = msg.attachments.array();
      for (const attachment of attachments) {
        const repost = new MessageEmbed()
          .setAuthor(msg.author?.tag, msg.author?.displayAvatarURL())
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
    console.log(`Sender: ${msg.author?.username}, Message: ${msg.content}`);
    console.log(`Error: ${error}`);
  }
});

client.on("message", async (msg) => {
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

      if (messageString.includes('/marahin') && msg.mentions.members && msg.mentions.members.size > 0) {
        for (const memberId of msg.mentions.members.map((x) => x.id)) {
          msg.channel.send(generateRandomInsult(memberId))
        }
      }

      if (perpusRegex.test(messageString)) {
        const regexResult = perpusRegex.exec(msg.content);
        const videoCode = regexResult && regexResult.length > 0 ? regexResult[2] : "";

        if (codeRegex.test(videoCode)) {
          msg.channel.send(`Yang ini bukan kodenya bang <@${id}>?`);
          const imageUrl = videoCode.replace("-", "");
          const perpusData = await axios.get(`https://www.javlibrary.com/en/vl_searchbyid.php?keyword=${videoCode}`);
          const imageRegexMatch = pictureRegex.exec(perpusData.data);
          let embed = new MessageEmbed()
            .setTitle(videoCode)
            .setColor(0xff0000)
            .setDescription("Search result for " + videoCode)
            .setURL(
              `https://www.javlibrary.com/en/vl_searchbyid.php?keyword=${videoCode}`
            )
            .setThumbnail(
              imageRegexMatch.length > 0 ? `https:${imageRegexMatch[0]}` : `https://pics.dmm.co.jp/mono/movie/adult/${imageUrl}/${imageUrl}pl.jpg`
            );

          msg.channel.send(embed);
        } else {
          msg.channel.send(`Salah code nya bang <@${id}>`);
        }
      }
    }
  } catch (error) {
    console.log(`Sender: ${msg.author.username}, Message: ${msg.content}`);
    console.log(`Error: ${error}`);
  }
});

cron.schedule('0 0 18 * * *', sendBirthday);

client.login(process.env.TOKEN_MENANGOS);

const generateRandomInsult = (id) => {
  const insults = [
    'OI KAK <@{id}> AKU MARAH NIH :rage::rage::rage::rage:',
    'HEI ANDA <@{id}> APA TIDAK MAU DITAMPAR DOKTER :angry::angry::angry::angry:',
    'KAMU MAUNYA DISUMPAHIN JOMBLO TERUS YA <@{id}>? :angel::angel::angel::angel:',
    '<@{id}> BELOM PERNAH KELILIPAN STETOSKOP YA? :see_no_evil::see_no_evil::see_no_evil::see_no_evil:',
    'ASAL KAMU TAU <@{id}> TETE KIMIHIME AJA MASIH LEBIH GEDE DARIPADA OTAK KAMU :speak_no_evil::speak_no_evil::speak_no_evil::speak_no_evil:',
  ];
  const rand = Math.round(Math.random() * 5);
  return insults[rand].replace('{id}', id);
}
