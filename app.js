require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const ytdl = require("ytdl-core");
const prefix = process.env.PREFIX;
const queue = new Map();
// console.log(process.env.PREFIX);

Object.keys(botCommands).map((mapping) => {
    // console.log("🚀 ~ file: app.js ~ line 8 ~ Object.keys ~ mapping", mapping);
    bot.commands.set(botCommands[mapping].name, botCommands[mapping]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
    console.log(
        "🚀 ~ file: app.js ~ line 22 ~ bot.on ~ msg author",
        msg.author.bot
    );
    if (msg.author.bot) return;
    // if (!msg.content.startsWith(prefix)) return;
    const serverQueue = queue.get(msg.guild.id);
    console.log("🚀 ~ file: app.js ~ line 21 ~ bot.on ~ msg", msg.content);
    const args = msg.content.split(" ") || msg.content.substring(1);
    console.log("🚀 ~ file: app.js ~ line 23 ~ bot.on ~ args", args);
    const command = args.shift().toLowerCase();
    console.log("🚀 ~ file: app.js ~ line 24 ~ bot.on ~ command", command);
    console.info(`Command : ${command}`);

    if (!bot.commands.has(command)) return;

    try {
        console.log(
            "🚀 ~ file: app.js ~ line 40 ~ bot.on ~ msg.content",
            msg.content
        );
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply("command execute problem!");
    }
    // if (msg.content === "ping") {
    //     msg.reply("pong");
    //     msg.channel.send("pong");
    // } else if (msg.content === "pong") {
    //     msg.reply("KONTOL");
    //     msg.channel.send("BIJI");
    // } else if (msg.content.startsWith("!kick")) {
    //     if (msg.mentions.users.size) {
    //         const taggedUser = msg.mentions.users.first();
    //         msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    //     } else {
    //         msg.reply("Please tag a valid user!");
    //     }
    // }
});
