const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getRandomImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src');
        const files = fs.readdirSync(srcPath);
        const imageFiles = files.filter(file => 
            file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
        );
        
        if (imageFiles.length === 0) {
            console.log('No image files found in src folder');
            return 'https://files.catbox.moe/k07bn6.jpg'; 
        }
        
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcPath, randomImage);
    } catch (e) {
        console.log('Error getting random image:', e);
        return 'https://files.catbox.moe/k07bn6.jpg'; 
    }
};

cmd({
    pattern: "legend",
    desc: "menu the bot",
    category: "menu",
    react: "🐇",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const time = runtime(process.uptime());
        
        let dec = `🌟 *Good ${
  new Date().getHours() < 12 ? 'Morning' : 
  (new Date().getHours() < 18 ? 'Afternoon' : 'Evening')
}, ${pushname}!* 🌟
╭━━━《 *LEGENDS-MD* 》━━━┈⊷
┃❍⁠⁠⁠⁠╭──────────────
┃❍⁠⁠⁠⁠│▸  Usᴇʀ : ${config.OWNER_NAME}
┃❍⁠⁠⁠⁠│▸  ʙᴀɪʟᴇʏs : 𝐌𝐮𝐥𝐭𝐢 𝐝𝐞𝐯𝐢𝐜𝐞
┃❍⁠⁠⁠⁠│▸  ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs : *${totalCommands}*
┃❍⁠⁠⁠⁠│▸  𝖳ʏᴘᴇ : 𝐍𝐨𝐝𝐞𝐣𝐬
┃❍⁠⁠⁠⁠│▸  ᴘʟᴀᴛғᴏʀᴍ : 𝐇𝐞𝐫𝐨𝐤𝐮
┃❍⁠⁠⁠⁠│▸  𝖣ᴇᴠᴇʟᴏᴘᴇʀ : Legend Team
┃❍⁠⁠⁠⁠│▸  𝖬ᴏᴅᴇ : [${config.MODE}]
┃❍⁠⁠⁠⁠│▸  𝖯ʀᴇғɪx : *[${config.PREFIX}]*
┃❍⁠⁠⁠⁠│▸  ᴛɪᴍᴇ : *${time}*
┃❍⁠⁠⁠⁠│▸  𝖵ᴇʀsɪᴏɴ : 𝟏.𝟎.𝟎
┃❍⁠⁠⁠⁠╰──────────────
╰━━━━━━━━━━━━━━━━━━━━━━━━┈⊷
╭━━〔 𝐌𝐄𝐍𝐔𝐋𝐈𝐒𝐓 〕━━┈⊷
┃❍╭─────────────·
┃❍┃• ᴘʀᴀʏᴇʀᴛɪᴍᴇ
┃❍┃• ϙᴜʀᴀɴᴍᴇɴᴜ
┃❍┃• ᴀɪᴍᴇɴᴜ
┃❍┃• ᴀɴɪᴍᴇᴍᴇɴᴜ
┃❍┃• ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ
┃❍┃• ғᴜɴᴍᴇɴᴜ
┃❍┃• ʀᴇᴀᴄᴛɪᴏɴᴍᴇɴᴜ
┃❍┃• ᴅʟᴍᴇɴᴜ
┃❍┃• sᴇᴛᴛɪɴɢsᴍᴇɴᴜ
┃❍┃• ʟɪsᴛᴄᴍᴅ
┃❍┃• ᴍᴀɪɴᴍᴇɴᴜ
┃❍┃• ᴛᴇᴍᴘᴍᴀɪʟ
┃❍┃• ɢʀᴏᴜᴘᴍᴇɴᴜ
┃❍┃• ᴀʟʟᴍᴇɴᴜ
┃❍┃• ʙɪʙʟᴇʟɪsᴛ
┃❍┃• ᴏᴛʜᴇʀᴍᴇɴᴜ
┃❍┃• ᴏᴡɴᴇʀᴍᴇɴᴜ
┃❍┃• ʟᴏɢᴏ<𝐭𝐞𝐱𝐭>
┃❍┃• ʀᴇᴘᴏ
┃❍┃• ʟᴏɢᴏᴍᴇɴᴜ
┃❍┃• �ᴘᴇsᴀᴍᴇɴᴜ
┃❍┃• ᴀᴅᴜʟᴛᴍᴇɴᴜ
┃❍└───────────┈⊷
╰─────────────────────┈⊷
> ${config.DESCRIPTION}`;
        
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
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: Legend VERIFIED ✅\nORG:LEGEND-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255794373476:+255621995482\nEND:VCARD"
                }
            }
        };

        await conn.sendMessage(
            from,
            {
                image: { url: getRandomImage() },
                caption: dec,
                contextInfo: {
                    forwardingScore: 5,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363419723191331@newsletter', 
                        newsletterName: "LEGENDS-MD",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: verifiedContact }
        );

        const audioUrls = [
            'https://files.catbox.moe/ooqm90.mp3',
            'https://files.catbox.moe/jnj107.mp3',
            
        ];
        const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

        await conn.sendMessage(from, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
