const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "uptime",
  alias: ["up"],
  desc: "Check how long the bot has been online.",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => {
  const runtime = () => {
    let seconds = process.uptime();
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "LEGENDS-MD | legend-md",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:LEGEND| LEG-XMD\nORG:LEGEND-TECH;\nTEL;type=CELL;type=VOICE;waid=255794373476:+255 621 995 482\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  const uptimeText = `*🤖 LEGENDS-MD Bot Uptime:*\n🕒 ${runtime()}\n\n💡 The bot has been running without interruption.`;

  await Void.sendMessage(m.chat, {
    text: uptimeText,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363419723191331@newsletter",
        newsletterName: "LEGENDS-MD Official"
      },
      externalAdReply: {
        title: "LEGENDS-MD",
        body: "Uptime Monitor by LEGENDS-MD",
        thumbnailUrl: "https://files.catbox.moe/k07bn6.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://github.com/boniphace"
      }
    }
  }, { quoted: fakeContact });
});
