const config = require('../config');
const { cmd, commands } = require('../command');

const whatsappChannelLink = 'https://whatsapp.com/channel/0029VbAve6TFnSzF6VkEce2S';

const speedLatencyQuotes = [
  "Speed matters in the digital world!",
  "Efficiency is doing better what is already being done.",
  "In the race against time, every millisecond counts.",
  "Performance isn't accidental, it's designed.",
  "The faster the response, the smoother the experience."
];

// Contact message for verified context
const verifiedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "LEGENDS-MD VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: Legend VERIFIED ✅\nORG:LEGEND-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255794373476:+255 621 995 482\nEND:VCARD"
    }
  }
};

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  use: '.ping',
  desc: "Check bot's response time, load, and stability.",
  category: "main",
  react: "⚡",
  filename: __filename
}, async (conn, mek, m, { from, quoted, sender, reply }) => {
  try {
    const start = Date.now();

    const statusEmojis = ['✅', '🟢', '✨', '📶', '🔋'];
    const stableEmojis = ['🟢', '✅', '🧠', '📶', '🛰️'];
    const moderateEmojis = ['🟡', '🌀', '⚠️', '🔁', '📡'];
    const slowEmojis = ['🔴', '🐌', '❗', '🚨', '💤'];

    const randomQuote = speedLatencyQuotes[Math.floor(Math.random() * speedLatencyQuotes.length)];

    const end = Date.now();
    const latencyMs = end - start;

    let stabilityEmoji = '';
    let stabilityText = '';
    let reactionEmoji = '⚡';

    if (latencyMs > 1000) {
      stabilityText = "Slow 🔴";
      stabilityEmoji = slowEmojis[Math.floor(Math.random() * slowEmojis.length)];
      reactionEmoji = '🐢';
    } else if (latencyMs > 500) {
      stabilityText = "Moderate 🟡";
      stabilityEmoji = moderateEmojis[Math.floor(Math.random() * moderateEmojis.length)];
      reactionEmoji = '🔄';
    } else {
      stabilityText = "Stable 🟢";
      stabilityEmoji = stableEmojis[Math.floor(Math.random() * stableEmojis.length)];
      reactionEmoji = '⚡';
    }

    const stylishText = `
> *LEGEND-MD: ${latencyMs}ms ${reactionEmoji}*
    `.trim();

    await conn.sendMessage(from, {
      text: stylishText,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363419723191331@newsletter',
          newsletterName: "LEGENDS-MD",
          serverMessageId: 143
        },
        externalAdReply: {
          title: "Legend | md reponse🚀",
          body: "Speed • Stability • Sync",
          thumbnailUrl: 'https://files.catbox.moe/k07bn6.jpg',
          sourceUrl: whatsappChannelLink,
          mediaType: 1,
          renderLargerThumbnail: false,
        }
      }
    }, { quoted: verifiedContact });

  } catch (e) {
    console.error("Error in ping command:", e);
    reply(`An error occurred: ${e.message}`);
  }
});
