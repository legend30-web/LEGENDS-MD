const { cmd } = require("../command");
const axios = require("axios");

// Family command with enhanced features
cmd({
    pattern: "family",
    desc: "Casey Family Information",
    category: "fun",
    react: "👨‍👩‍👧‍👦",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `
*╭───『 LEGEND FAMILY 』───╮*
│
│ 👑 *Founder:* TZ
│
│ *───『 Core Team 』───*
│ ◦ BONIPHACE 
│ ◦ YESSER DK
│ ◦ TIMNASSA
│ ◦ DULLAH
│ ◦ 
│
│ *───『 Senior Members 』───*
│ ◦ BONIPHACE
│ ◦ YESSER DK
│ ◦ TIMNASSA
│ ◦ DULLAH
│ ◦ 
│
│ *───『 Active Members 』───*
│ ◦ 
│ ◦ 
│ ◦ 
│ ◦ 
│ ◦ 
│
│ *───『 Support Team 』───*
│ ◦ 
│ ◦ 
│ ◦ 
│ ◦ 
│
╰─────────────────╯
`.trim();

    try {
        await conn.sendMessage(m.chat, {
            image: { 
                url: "https://files.catbox.moe/k07bn6.jpg",
                mimetype: "image/jpeg"
            },
            caption: familyList,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419723191331@newsletter',
                    newsletterName: 'LEGENDS-MD,
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Family command error:", error);
        reply("❌ An error occurred while fetching the family list. Please try again.");
    }
});

// Staff promotion command with enhanced security
cmd({
    pattern: "promotestaff",
    desc: "Promote staff members to admin (Owner only)",
    category: "admin",
    react: "👑",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, isBotAdmins, reply, sender, isOwner }) => {
    try {
        if (!isGroup) return reply("❌ This command works only in groups");
        if (!isBotAdmins) return reply("❌ Bot needs admin privileges");
        if (!isOwner) return reply("❌ Owner-only command");

        // Staff list with proper JIDs
        const staffContacts = [
            "120363418653876892@g.us", // Replace with actual staff numbers
            "120363418653876892@g.us"
        ].filter(Boolean);

        if (staffContacts.length === 0) {
            return reply("❌ No valid staff contacts configured");
        }

        const metadata = await conn.groupMetadata(from);
        const existingAdmins = metadata.participants
            .filter(p => p.admin !== null)
            .map(p => p.id);

        const toPromote = staffContacts.filter(id => 
            !existingAdmins.includes(id) && 
            metadata.participants.some(p => p.id === id)
        );

        if (toPromote.length === 0) {
            return reply("ℹ️ All staff are already admins or not in group");
        }

        // Batch promotion for better performance
        await conn.groupParticipantsUpdate(from, toPromote, "promote");
        
        reply(`✅ Promoted ${toPromote.length} staff members:\n` + 
              toPromote.map(id => `◦ ${id.split('@')[0]}`).join('\n'));

    } catch (error) {
        console.error("Promote error:", error);
        reply(`❌ Error: ${error.message}`);
    }
});

// Group termination command with enhanced features
cmd({
    pattern: "terminate",
    desc: "Reset group settings (Admin only)",
    category: "admin",
    react: "🔄",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply, isOwner }) => {
    try {
        if (!isGroup) return reply("❌ Group-only command");
        if (!isBotAdmins) return reply("❌ Bot needs admin rights");
        if (!isAdmins && !isOwner) return reply("❌ Admin-only command");

        const newSettings = {
            name: "𓆩legend xᴍᴅ𓆪",
            desc: `༒🔱legend md 🔱༒\n\nOfficial group of legend Clan`,
            image: "https://files.catbox.moe/k07bn6.jpg"
        };

        // Update group name
        await conn.groupUpdateSubject(from, newSettings.name);
        
        // Update description
        await conn.groupUpdateDescription(from, newSettings.desc);
        
        // Update profile picture
        try {
            const { data } = await axios.get(newSettings.image, { 
                responseType: "arraybuffer" 
            });
            await conn.updateProfilePicture(from, Buffer.from(data));
        } catch (imgError) {
            console.error("Image update failed:", imgError);
            reply("ℹ️ Group info updated but couldn't change picture");
            return;
        }

        reply(`✅ Group terminated successfully!\nNew name: ${newSettings.name}`);

    } catch (error) {
        console.error("Terminate error:", error);
        reply(`❌ Error: ${error.message}`);
    }
});
