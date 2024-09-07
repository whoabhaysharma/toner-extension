const { sendMessage } = require("./geminiService");

const changeTone = async (text, tone) => {
    const [x, y] = tone;
    const input = `${text} [${x},${y}]`;
    return sendMessage(input);
}

module.exports = {
    changeTone,
}