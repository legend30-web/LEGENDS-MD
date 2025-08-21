const { cmd } = require('../command');

cmd({
    pattern: "block",
    desc: "Blocks this chat",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, m, { reply, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    
    if (m.sender !== botOwner) {
        await react("❌");
        return reply("_Only the bot owner can use this command._");
    }

    try {
        const chatId = m.chat; // Get current chat ID
        await react("✅");
        
        // Combine both messages into one send operation
        await conn.sendMessage(m.chat, { 
            text: `_Successfully blocked this chat_`,
            image: { url: `https://files.catbox.moe/k07bn6.jpg` },  
            caption: "*legends*\n\nThis chat has been blocked by the owner.",
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419723191331@newsletter',
                    newsletterName: 'LEGENDS-MD 🌟',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });
        
        // Actually block the chat after sending the message
        await conn.updateBlockStatus(chatId, "block");
    } catch (error) {
        console.error("Block command error:", error);
        await react("❌");
        reply(`_Failed to block this chat._\nError: ${error.message}_`);
    }
});

cmd({
    pattern: "unblock",
    desc: "Unblocks this chat",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, m, { reply, react }) => {
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== botOwner) {
        await react("❌");
        return reply("_Only the bot owner can use this command._");
    }

    try {
        const chatId = m.chat; // Get current chat ID
        await react("✅");
        
        // Combine both messages into one send operation
        await conn.sendMessage(m.chat, { 
            text: `_Successfully unblocked this chat_`,
            image: { url: `https://files.catbox.moe/k07bn6.jpg` },  
            caption: "*legends*\n\nThis chat has been unblocked by the owner.",
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419723191331@newsletter',
                    newsletterName: 'LEGENDS-MD 🌟',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });
        
        // Actually unblock the chat after sending the message
        await conn.updateBlockStatus(chatId, "unblock");
    } catch (error) {
        console.error("Unblock command error:", error);
        await react("❌");
        reply(`_Failed to unblock this chat._\nError: ${error.message}_`);
    }
});
