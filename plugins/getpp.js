const { cmd } = require("../command");

cmd({
  pattern: "getpp",
  alias: [],
  use: "pp",
  desc: "Get profile picture of a user (replied user in group, or DM user)",
  category: "tools",
  react: "🖼️",
  filename: __filename
},
async (conn, mek, m, { from, sender, reply, isGroup }) => {
  try {
    const quotedMsg = mek.message?.extendedTextMessage?.contextInfo?.participant;
    const quotedKey = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    let targetJid;

    if (isGroup) {
      if (quotedMsg && quotedKey) {
        targetJid = quotedMsg;
      } else {
        return reply("❌ Please reply to someone's message to get their profile picture.");
      }
    } else {
      targetJid = from.endsWith("@s.whatsapp.net") ? from : sender;
    }

    let imageUrl;
    try {
      imageUrl = await conn.profilePictureUrl(targetJid, 'image');
    } catch {
      imageUrl = "https://files.catbox.moe/k07bn6.jpg";
    }

    const fakeVCard = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "LEGENDS-MD ✅",
          vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: Legend ✅\nORG: LEGEND-TECH;\nTEL;type=CELL;type=VOICE;waid=255794373476:+255621995482\nEND:VCARD",
          jpegThumbnail: Buffer.from([])
        }
      }
    };

    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption: `🖼️ Profile Picture of @${targetJid.split('@')[0]}`,
      contextInfo: {
        mentionedJid: [targetJid],
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "LEGENDS-MD",
          newsletterJid: "120363419723191331@newsletter"
        }
      }
    }, { quoted: fakeVCard });

  } catch (err) {
    console.error("Error in getpp:", err);
    reply("❌ Failed to fetch profile picture.");
  }
});
      
