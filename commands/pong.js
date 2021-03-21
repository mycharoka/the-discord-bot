module.exports = {
    name: "pong",
    description: "POONGG!",
    execute(msg, args) {
        msg.reply("ping");
        msg.channel.send("ping");
    },
};
