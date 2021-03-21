module.exports = {
    name: "ping",
    description: "PIINGG!",
    execute(msg, args) {
        msg.reply("pong");
        msg.channel.send("pong");
    },
};
